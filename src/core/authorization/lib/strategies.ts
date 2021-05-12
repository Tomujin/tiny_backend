import { Strategy as JWTStrategy } from "passport-jwt";

export class JWTScopeStrategy extends JWTStrategy {
  authenticate(req: any, options: any) {
    req.scope = options.scope;
    return super.authenticate(req, options);
  }
}
