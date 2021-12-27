const DEV_ENV = 'dev';
const PROD_ENV = 'prod';

export function isDevEnv(env: string) {
  return env === DEV_ENV;
}

export function isProdEnv(env: string) {
  return env === PROD_ENV;
}
