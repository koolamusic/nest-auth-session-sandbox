import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { sessionStore } from "./auth/constants";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    console.log(
      "=========BEFORE LOGIN REQ========",
      req.isAuthenticated(),
      req.headers,
      req.user,
      req.sessionID
    );
    // Note isAuthenticated() will be true because the guard runs it's logic before
    // it is then passed into the controller
    const user = this.authService.login({ ...req.body, ...req.user }, req);
    console.log(
      "===========AFTER LOGIN REQ========",
      req.isAuthenticated(),
      req.headers,
      req.sessionID,
      req.user
    );
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/profile")
  getProfile(@Request() req) {
    console.log(
      req.user,
      req.isAuthenticated(),
      req.authInfo,
      "and",
      req.sessionID,
      req.session
    );
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post("auth/u")
  getProfileLocal(@Request() req) {
    console.log(
      "CONSOLE FROM auth/u",
      req.sessionStore.all((err, session) => {
        console.log(err, session, "ALL SESSIONS IN REQ OBJECT");
      }),
      req.session.passport,
      sessionStore.all((err, session) => {
        console.log(err, session, "ALL SESSIONS IN STORE OBJECT");
      })
    );
    return req.user;
  }
}
