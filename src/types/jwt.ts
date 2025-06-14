export interface JwtPayload {
  id: number;
  email: string;
  username: string;
  sub: string;
  exp: number;
  iat: number;
  [key: string]: unknown; // for other optional fields
}