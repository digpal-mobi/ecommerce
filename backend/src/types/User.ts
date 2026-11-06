export interface AccessTokenPayload {
  sub: string;
  role: "user" | "admin";
  tokenType: "access";
}
