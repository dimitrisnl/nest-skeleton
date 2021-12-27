import * as rateLimit from 'express-rate-limit';
import * as requestIp from 'request-ip';

export const globalRequestLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  keyGenerator: (req) => requestIp.getClientIp(req),
});

export const signUpRequestLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10, // start blocking after 10 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
  keyGenerator: (req) => requestIp.getClientIp(req),
});
