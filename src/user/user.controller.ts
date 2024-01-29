import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthGuard } from 'src/middlewares/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
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

  @Post('auth/login')
  async authenticate(
    @Body() authenticateDto: AuthenticateDto,
    @Res() res: Response,
  ) {
    try {
      const auth = await this.userService.authenticate(authenticateDto);
      res.json({
        data: auth,
        message: 'Login successfully',
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.getStatus()).json({
          message: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
        });
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }
}
