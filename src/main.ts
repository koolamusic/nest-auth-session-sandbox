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
    resave: true,
    name: "__cent_sid",
    secret: "secret",
    cookie: {
      httpOnly: false,
      signed: true,
      maxAge: 60000,
    },
  });
  app.use(serverSession);
  app.use(passport.initialize());
  // app.use(passport.session())
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
