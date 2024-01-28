import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const existUser = await this.userService.checkUserExist(
        createUserDto.email,
      );
      if (existUser) {
        return res.status(409).json({
          message: 'User already exist',
        });
      }
      const user = await this.userService.register(createUserDto);
      res.json({
        message: 'Register successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}
