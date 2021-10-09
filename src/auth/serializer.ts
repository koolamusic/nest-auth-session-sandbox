import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: any, id?: any) => void): void {
      console.log("log from the Cookie Seeeeeeerializer ----------------", user)

        done(null, user);
    }

    deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
      console.log("log from the Cookie Deserializer ----------------", payload)

        done(null, payload);
    }
}
