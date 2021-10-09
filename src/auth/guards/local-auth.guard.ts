/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // canActivate(context: ExecutionContext) {
  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   const request = context.switchToHttp().getRequest();
  //   const result = super.canActivate(context);
  //   const loginUser = super.logIn(request)

  //   console.log(result, "login",  loginUser.then(e => e))
  //   return result
  // }


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const result = (await super.canActivate(context) as boolean); // THIS MUST BE CALLED FIRST
    await super.logIn(request);
    return result;
}

handleRequest(err, user, info) {
    if (err || !user) {
        throw err || new UnauthorizedException();
    }

    return user;
}
}
