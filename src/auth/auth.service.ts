import { Injectable, Request } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      console.log(result, "in validate user");

      return { ...result, access_token: this.jwtService.sign(result) };
    }
    return null;
  }

  async login(user: any, req) {
    console.log("LOG FROM AUTHSERVICE/login", user, "-----------");
    const payload = {
      username: user.username,
      sub: user.userId,
      signature: req.sessionID,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
