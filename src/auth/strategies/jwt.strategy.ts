import { Injectable, Request } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log("log from the JWT Strategy----------------", payload);
    /**
     * 1. Read and validate the JWT Token. FYI the validated token is the argyment to this function
     * 2. Make Database call to the User Service to retrieve User info about JWT Subject `payload.sub`
     * 3. Add Caching measure for token: use an LRU-Cache as first step before making DB Service Call
     * 4. If valid session exists, continue with response or throw Unauthorized Error
     */
    // return { userId: payload.sub, username: payload.username };
    return payload;
  }
}
