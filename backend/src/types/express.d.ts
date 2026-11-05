import { jwtUser } from "./User";

export type JwtPayloadUser = jwtUser;

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadUser;
    }
  }
}


