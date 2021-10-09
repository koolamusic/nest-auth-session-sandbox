/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const request = context.switchToHttp().getRequest();
    request.user = {}
    request.user.username= "chris";
    request.user.password = 'secret';
    const result = (await super.canActivate(context) as boolean);
    // const loginUser = await super.logIn(request)

    console.log("log from the JWT Guard----------------", result, request.sessionID)
    // console.log(result, "login", loginUser)
    return result
  }

}