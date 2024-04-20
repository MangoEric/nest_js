import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    JwtModule.register({
      secret: 'mangoEric',
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}