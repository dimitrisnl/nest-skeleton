export const config = {
  project: {
    name: 'Project',
    address: 'project.com',
    logoUrl: 'https://dnlytras.com/avatar.png',
    color: '#123456',
    url: 'http://localhost:4200',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/reset-password',
    socials: [
      {name: 'Twitter', url: 'https://twitter.com/--project-handler--'},
    ],
  },
  sender: {
    name: 'Dimitrios',
    email: 'hi@dnlytras.com',
  },
} as const;

export type MailConfig = typeof config;
