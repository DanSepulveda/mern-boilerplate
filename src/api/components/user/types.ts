import type { Model, Document } from 'mongoose';

interface UserAccount {
  email: string;
  salt: string;
  password: string;
  activeCode: string;
  verified: boolean;
  active: boolean;
}

interface UserBasicData {
  names: string;
  surename: string;
  lastname: string;
}

export interface User {
  account: UserAccount;
  basicData: UserBasicData;
}

export interface UserDoc extends Document, User {
  generateJWT: () => string;
  hashPWD: () => void;
  comparePWD: (password: string) => boolean;
  generateActiveCode: () => string;
}

export interface UserModel extends Model<UserDoc> {
  isRegistered: (username: string) => boolean;
}
