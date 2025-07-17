// src/adapters/bcrypt-adapter.ts

import bcrypt from 'bcrypt';

export interface BcryptAdapter {
  hash(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}

export class BcryptAdapterImpl implements BcryptAdapter {
  constructor(private readonly saltRounds: number = 10) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
