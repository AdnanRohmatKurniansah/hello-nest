import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const newuser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = newuser;
    return user;
  }
  async checkUserExist(email: string) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return existUser;
  }
  async authenticate(authenticateDto: AuthenticateDto) {
    const user = await this.checkUserExist(authenticateDto.email);
    if (user && (await compare(authenticateDto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      const secret = await this.configService.get('secret');
      const payload = { sub: user.id, name: user.name, email: user.email };
      const access_token = await this.jwtservice.signAsync(payload, {
        secret,
        expiresIn: '15d',
      });
      return {
        ...result,
        access_token: `Bearer ${access_token}`,
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
