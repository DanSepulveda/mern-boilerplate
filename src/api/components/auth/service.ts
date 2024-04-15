import User from '../user/model';
import createHttpError from 'http-errors';
import type { LoginRes, SignData, RecoveryData } from './interfaces';
import { TOKEN_ERROR, USER_ERROR } from '../responseMessages';

export const verifyAccout = async (email: string): Promise<void> => {
  const user = await User.updateOne(
    { 'account.email': email },
    { 'account.verified': true }
  );

  if (user.modifiedCount === 0) throw createHttpError(400, TOKEN_ERROR.invalid);
};

export const login = async (loginData: SignData): LoginRes => {
  const { email, password } = loginData;
  const user = await User.findOne({ 'account.email': email });
  if (user === null) throw createHttpError(400, USER_ERROR.unregistered);
  if (!user.account.verified) throw createHttpError(400, USER_ERROR.unverified);
  if (!user.account.active) throw createHttpError(400, USER_ERROR.disabled);
  const match: boolean = user.comparePWD(password);
  if (!match) throw createHttpError(400, USER_ERROR.wrongPassword);
  return user;
};

export const recoveryPassword = async (
  email: string
): Promise<InstanceType<typeof User>> => {
  const user = await User.findOne({ 'account.email': email });
  if (user === null) throw createHttpError(400, USER_ERROR.unregistered);
  if (!user.account.verified) throw createHttpError(400, USER_ERROR.unverified);
  if (!user.account.active) throw createHttpError(400, USER_ERROR.disabled);
  return user;
};

export const resetPassword = async (data: RecoveryData): Promise<void> => {
  const { email, password, confirmPassword } = data;
  if (password !== confirmPassword)
    throw createHttpError(400, 'Password incorrect');
  const user = User.findByEmail(email);
  user.account.password = password;
  await user.save();
};
