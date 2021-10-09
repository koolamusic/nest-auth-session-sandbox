import * as session from 'express-session'


export const jwtConstants = {
  secret: 'secret',
};


export const sessionStore = new session.MemoryStore()