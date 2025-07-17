// src/adapters/jwt-adapter.ts
import jwt, { SignOptions } from 'jsonwebtoken';

export interface JwtAdapter {
  sign(payload: object, expiresIn?: string): string;
  verify<T = any>(token: string): T;
}

export class JwtAdapterImpl implements JwtAdapter {
  constructor(private readonly secret: string) {}

  sign(payload: object, expiresIn = '15m'): string {
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
    return jwt.sign(payload, this.secret, options);
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}