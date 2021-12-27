import {Injectable, Logger} from '@nestjs/common';

import {
  EmailAlreadyExistsException,
  InvalidCredentialsException,
  TermsNotAcceptedException,
  UserNotFoundException,
} from '@/common/exceptions';
import {MembershipRole} from '@/common/types';
import {getUniqueId, hashPassword, validatePassword} from '@/common/utils';
import {UserModel} from '@/models';
import {MailerService, PrismaService} from '@/modules/shared';

import {LoginRequest, RegisterRequest} from './dto';

const DEFAULT_ORG_NAME = 'My Team';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(registerRequest: RegisterRequest): Promise<void> {
    const {email, password, acceptedTerms} = registerRequest;

    if (!acceptedTerms) {
      throw new TermsNotAcceptedException();
    }

    // todo: should I do this check, or avoid +1 DB call?
    const emailAvailable = await this.isEmailAvailable(email);

    if (!emailAvailable) {
      throw new EmailAlreadyExistsException();
    }

    const emailVerificationToken = getUniqueId();

    try {
      const hashedPassword = await hashPassword(password);
      const acceptedTermsAtDate = new Date().toISOString();

      const data = {
        email,
        password: hashedPassword,
        acceptedTermsAt: acceptedTermsAtDate,
        emailVerifiedAt: undefined,
        memberships: {
          create: {
            role: MembershipRole.OWNER,
            org: {create: {name: DEFAULT_ORG_NAME}},
          },
        },
        emailVerification: {
          create: {
            token: emailVerificationToken,
          },
        },
      };
      // Save
      await this.prismaService.user.create({data, select: null});
      this.logger.verbose(`Created user with email: ${email}`);
    } catch (error) {
      throw error;
    }

    this.logger.verbose(`Sending email verification to: ${email}`);
    await this.mailerService.sendVerifyEmailMail(email, emailVerificationToken);
  }

  public async login(loginRequest: LoginRequest) {
    const {email, password} = loginRequest;
    const user = await this.prismaService.user.findUnique({
      where: {email: email.toLowerCase()},
      include: {
        memberships: {
          include: {
            org: true,
          },
        },
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    // ! Id needed app-wide email verification, uncomment here.
    // Implemented this as EmailVerified guard
    // if (!user.emailVerifiedAt) {
    //   throw new EmailNotVerifiedException();
    // }

    try {
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) {
        throw new InvalidCredentialsException();
      }
    } catch {
      throw new InvalidCredentialsException();
    }

    return UserModel.fromEntity(user);
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {email},
      select: {email: true},
    });

    return user === null;
  }
}
