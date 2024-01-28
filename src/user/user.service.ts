import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
