# Notes

Jottings

## Using a JWT Guard

JWT guard automatically reads the Bearer token and verifies the JWT to accept that a user is authenticated. 
However this is not enough to work with sessions, if you want to serialize and parse more user information for authorization, so the `validate` method in `jwt.strategy` will have to include a hook for read the `jwt.sub` and using it to call a `validateUser` method while this works, the essence of relying on sessions will not be achieved, thus the sessionID of the user will need to be added to the token once generated. This means that a `LocalGuard` will be utilized on Login and Signup endpoints thus that the verified `sessionID` will be used to check `req.sessionStore` for a valid session and a valid user data which includes authorization tokens for every other request. 

#### Fine tuning

- Using a session store like redis would improve performance
- Make `req.session` a mandatory dependency of `JWT-Guards` thus that JWT tokens require a valid session to complete their authorization step

## Using a Local Guard + Cookie Serializer

The alternative to using a JWT Guard would be to solely rely on the LocalGuard for all Auth `directives` however leveraging JWT would require a hand written implementation like 

```js
const request = context.switchToHttp().getRequest();
const token = request.headers.authorization.split("");
```

You can run a check to verify or validate that the first index of the split array is `=== 'Bearer'` 

By doing so we treat the JWT as an `id_token` that shares valid user information that can be sent to other micro-services, but only used to query the session in the Auth Gateway to ensure that a valid session exists. 

> Note that with LocalGuard: isAuthenticated() will be true because the guard runs it's logic before it is then passed into the controller

### Caveats

If you rely on the `JWTGuard` without checking for a valid session, the JWT will allow the user to be authenticated and instantiate a new session for the user since, they still have a valid session, thereby creating a new session, that will not have pre-computed user authorization tokens, which can lead to race conditions. So a pre-requisite for invoking a JWTGuard first is that you have post hook that validates the session signature in the JWT token.

If you use `LocalGuards` you must append signature to cookies, else the `CookieSerializer` will fail, reason being that is how express-session knows how to lookup session signatures, given the `prefix` defined when instantiating the session config object.


## Work Arounds

If you leverage something like express-session, you will need to append the signatures in `Set-Cookie` headers for the client application to be able to add the signature to cookies and for every request to the server this would be stateful, however `JWT` is a proponent for Stateless Authentication, thus the workaround here would involve appending the sessionID to a JWT Token and using it to sign every request. You can retrieve this sessionId from 

- verifying the JWT Token and using it as a parameter to `req.sessionStore` to get User Session information or
- Adding it to `req.headers` from the client either as a cookie or custom header parameter like `x-session-signature` to quickly perform this verification step.

Note that a valid JWT Token should always authenticate the user, but not necessarily **Authorize** them to perform an action on the API.