export interface jwtUser {
  _id?: string;
  email: string;
  role?: string;
  username?: string;
}

export type JwtPayloadUser = jwtUser;

