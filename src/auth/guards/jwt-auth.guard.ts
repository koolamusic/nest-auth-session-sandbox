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

    try {

    console.log(
      "log from the JWT Guard----------------",
      request.isAuthenticated(),
      result,
      request.session.passport,
      request.headers,
      await request.sessionStore.get(request.headers['signature'], (err, sess) => {

        try {
        
        if(err) throw new UnauthorizedException(err)
        if(sess.cookie) {
          console.log("sess.cookie in jwt0-guard", sess.cookie, sess.cookie.data )
        }
         console.log('//////////////////////////////////////',
         sess, '////////////////////////////////////////////////')
        } catch (error) {
          console.log(error)
        }
      }),
      request.sessionID
    );

    return result;
  } catch (error) {
      throw new UnauthorizedException(error);
      
  }
    // try {
    //   if (request.session.passport.user) {
    //     return result;
    //   }
    // } catch (e) {
    //   throw new UnauthorizedException();
    // }
  }
}
