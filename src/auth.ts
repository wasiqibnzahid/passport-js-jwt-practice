import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Request, Response, NextFunction } from "express";

export const users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
  },
];

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-secret-key",
};

passport.use(
  new Strategy(jwtOptions, (payload, done) => {
    console.log(payload)
    const user = users.find((u) => u.id === payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

export const authenticate = passport.authenticate("jwt", { session: false });
