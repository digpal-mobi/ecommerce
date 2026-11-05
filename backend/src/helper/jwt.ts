import jwt, { SignOptions } from "jsonwebtoken";
import { jwtUser } from "../types/User";

export const generateToken = (
    user: jwtUser,
    secret: string,
    expiresIn?: SignOptions["expiresIn"]
) => {
    return jwt.sign(user, secret, {
        expiresIn,
    });
};

export const verifyToken = <T>(token: string, secret: string) => {
    return jwt.verify(token, secret) as T;
};