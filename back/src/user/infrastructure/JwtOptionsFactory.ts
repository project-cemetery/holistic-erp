import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory as Factory } from '@nestjs/jwt'

import { Configuration } from '&back/config/Configuration'

@Injectable()
export class JwtOptionsFactory implements Factory {
  public constructor(private readonly config: Configuration) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secretOrKeyProvider: () => this.config.getStringOrThrow('APP_SECRET'),
      signOptions: {
        expiresIn: '365 days',
      },
    }
  }
}
