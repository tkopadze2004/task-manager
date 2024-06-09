import { User } from './user.interface';

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Token {
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}
export interface AuthResponse {
  user: User;
  token: Token;
}
