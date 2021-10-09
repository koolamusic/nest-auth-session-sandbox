import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { sessionStore } from "./auth/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverSession = session({
    store: sessionStore,
    saveUninitialized: true,
    rolling: false,
    resave: true,
    name: "__req.sid",
    secret: "secret",
    cookie: {
      httpOnly: true,
      signed: false,
      maxAge: 60000,
    },
  });
  app.use(serverSession);
  app.use(passport.initialize());
  app.use(passport.session())

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

