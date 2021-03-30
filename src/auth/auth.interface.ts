import { Request } from 'express';

/**
 * @description the jwt payload
 * @property sub userId
 * @property email user email
 * @property name user name
 */
export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

/**
 * @description the local strategy payload
 * @property name
 * @property email
 * @property userId
 */
export interface Payload {
  name: string;
  email: string;
  userId: string;
}

export type AuthRequest = Request & { user: Payload };
