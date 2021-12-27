import {ValidationPipe} from '@nestjs/common';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import * as createRedisStore from 'connect-redis';
import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as passport from 'passport';
import {createClient} from 'redis';
import * as requestIp from 'request-ip';

import {AppModule} from './app.module';
import {TransformInterceptor} from './common/interceptors/transform.interceptor';
import {isDevEnv, isProdEnv} from './config/environment-utils';
import {globalRequestLimit, signUpRequestLimit} from './config/request-limit';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const env = configService.get('NODE_ENV');

  logger.verbose(`Initializing for ${env} Environment`);

  // Security
  app.use(helmet());
  app.use(cookieParser());
  // ---- Security

  // Cors
  if (isDevEnv(env)) {
    logger.verbose(`Enabling Cors`);
    app.enableCors();
  }
  // ---- Cors

  // Interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  // ---- Interceptors

  // Limits
  app.use(requestIp.mw());
  app.use(globalRequestLimit);
  app.use('/auth/signup', signUpRequestLimit);
  // ---- Limits

  // Session
  const RedisStore = createRedisStore(session);
  const redisHost: string = configService.get('REDIS_HOST');
  const redisPort: number = configService.get('REDIS_PORT');
  const redisClient = createClient({
    host: redisHost,
    port: redisPort,
  });

  redisClient.on('error', (err) =>
    Logger.error('Could not establish a connection with redis. ' + err),
  );
  redisClient.on('connect', () =>
    Logger.verbose('Connected to redis successfully'),
  );

  app.use(
    session({
      store: new RedisStore({client: redisClient as any}),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: isProdEnv(env),
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  // ---- Session

  // CSURF must be after cookie-parser & session
  // app.use(csurf());

  const port = configService.get('PORT');
  await app.listen(port);
  logger.verbose(`Application listening on port ${port}`);
}

// eslint-disable-next-line no-floating-promise/no-floating-promise
bootstrap();
