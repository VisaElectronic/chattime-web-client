import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

export function getPayloadFromToken(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}