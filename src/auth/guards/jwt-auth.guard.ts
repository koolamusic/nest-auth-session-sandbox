/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const request = context.switchToHttp().getRequest();
    const result = (await super.canActivate(context)) as boolean;
    // const loginUser = await super.logIn(request)

    console.log(
      "log from the JWT Guard----------------",
      request.isAuthenticated(),
      result,
      request.session.passport,
      request.headers,
      await request.sessionStore.get(request.headers['signature'], (err, sess) => {
         console.log('//////////////////////////////////////',
         err, sess, '////////////////////////////////////////////////')
      }),
      request.sessionID
    );

    return result;
    // try {
    //   if (request.session.passport.user) {
    //     return result;
    //   }
    // } catch (e) {
    //   throw new UnauthorizedException();
    // }
  }
}
