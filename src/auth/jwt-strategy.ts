import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-paload.interface";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

  ){
    super({
      secretOrKey: 'Secret85',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  private logger = new Logger("JwtStrategy");
  async validate(payload: JwtPayload):Promise<User>{
    const { username } = payload;
    const user = await this.usersRepository.findOne({ username });

    if(!user){
      this.logger.error(`Unauthorized User ${username}`)
      throw new UnauthorizedException();
    }

    return user;
  }


}