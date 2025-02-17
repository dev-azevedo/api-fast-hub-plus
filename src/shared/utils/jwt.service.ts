import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { JwtUserDto } from "modules/users/dtos/jwt.user.dto.js";

dotenv.config()

class JwtService {
  private readonly secret: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found");
    }

    this.secret = process.env.JWT_SECRET as string;
  }

  public generateToken = (payload: JwtUserDto): string => {
    return jwt.sign(payload, this.secret, { expiresIn: "24h" });
  };

  public verifyToken = (token: string): JwtUserDto => {
    const [bearer, tokenFormatted] = token.split(" ");

    if (bearer !== "Bearer")
      throw new Error("Token is not a bearer token");

    try {
      return jwt.verify(tokenFormatted, this.secret as string) as JwtUserDto;
    } catch (error) {
      throw new Error("Token is invalid");
    }
  };
}

export default JwtService;