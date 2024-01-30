// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { PrismaService } from '../prisma.service'; // Update the path as needed
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { CreateUserDto } from './dto/create-user.dto';
// import { AuthenticateDto } from './dto/authenticate.dto';
// import { UnauthorizedException } from '@nestjs/common';
// import { hash, compare } from 'bcrypt';

// describe('UserService', () => {
//   let service: UserService;
//   let prismaService: PrismaService;
//   let jwtService: JwtService;
//   let configService: ConfigService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: PrismaService,
//           useValue: {
//             user: {
//               create: jest.fn(),
//               findUnique: jest.fn(),
//             },
//           },
//         },
//         {
//           provide: JwtService,
//           useValue: {
//             signAsync: jest.fn(),
//           },
//         },
//         {
//           provide: ConfigService,
//           useValue: {
//             get: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     prismaService = module.get<PrismaService>(PrismaService);
//     jwtService = module.get<JwtService>(JwtService);
//     configService = module.get<ConfigService>(ConfigService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('register', () => {
//     it('should create a new user', async () => {
//       const createUserDto: CreateUserDto = {
//         name: 'Test User',
//         email: 'test@gmail.com',
//         password: 'password123',
//       };

//       const hashedPassword = await hash(createUserDto.password, 10);

//       jest.spyOn(prismaService.user, 'create').mockImplementation(async () => ({
//         ...createUserDto,
//         password: hashedPassword,
//       }));

//       const result = await service.register(createUserDto);

//       expect(result).toEqual({ name: 'Test User', email: 'test@gmailcom' });
//     });
//   });

//   describe('checkUserExist', () => {
//     it('should return user if user with given email exists', async () => {
//       const userEmail = 'test@example.com';
//       const existingUser = {
//         id: 1,
//         name: 'Test User',
//         email: userEmail,
//         password: 'hashedPassword',
//       };

//       jest
//         .spyOn(prismaService.user, 'findUnique')
//         .mockImplementation(async () => existingUser);

//       const result = await service.checkUserExist(userEmail);

//       expect(result).toEqual(existingUser);
//     });

//     it('should return null if user with given email does not exist', async () => {
//       const userEmail = 'nonexistent@example.com';

//       jest
//         .spyOn(prismaService.user, 'findUnique')
//         .mockImplementation(async () => null);

//       const result = await service.checkUserExist(userEmail);

//       expect(result).toBeNull();
//     });
//   });

//   describe('authenticate', () => {
//     it('should return access token if credentials are valid', async () => {
//       const authenticateDto: AuthenticateDto = {
//         email: 'test@example.com',
//         password: 'password123',
//       };

//       const existingUser = {
//         id: 1,
//         name: 'Test User',
//         email: authenticateDto.email,
//         password: await hash(authenticateDto.password, 10),
//       };

//       jest
//         .spyOn(service, 'checkUserExist')
//         .mockImplementation(async () => existingUser);
//       jest.spyOn(compare, 'compare').mockImplementation(async () => true);

//       const mockSignAsync = jest
//         .spyOn(jwtService, 'signAsync')
//         .mockImplementation(async () => 'mockedAccessToken');
//       jest
//         .spyOn(configService, 'get')
//         .mockImplementation(async () => 'mockedSecret');

//       const result = await service.authenticate(authenticateDto);

//       expect(result).toEqual({
//         name: 'Test User',
//         email: 'test@example.com',
//         access_token: 'Bearer mockedAccessToken',
//       });
//       expect(mockSignAsync).toHaveBeenCalledWith(
//         {
//           sub: existingUser.id,
//           name: existingUser.name,
//           email: existingUser.email,
//         },
//         { secret: 'mockedSecret', expiresIn: '15d' }
//       );
//     });

//     it('should throw UnauthorizedException if credentials are invalid', async () => {
//       const authenticateDto: AuthenticateDto = {
//         email: 'test@example.com',
//         password: 'invalidPassword',
//       };

//       const existingUser = {
//         id: 1,
//         name: 'Test User',
//         email: authenticateDto.email,
//         password: await hash('password123', 10),
//       };

//       jest
//         .spyOn(service, 'checkUserExist')
//         .mockImplementation(async () => existingUser);
//       jest.spyOn(compare, 'compare').mockImplementation(async () => false);

//       await expect(service.authenticate(authenticateDto)).rejects.toThrowError(
//         UnauthorizedException,
//       );
//     });

//     it('should throw UnauthorizedException if user does not exist', async () => {
//       const authenticateDto: AuthenticateDto = {
//         email: 'nonexistent@example.com',
//         password: 'password123',
//       };

//       jest
//         .spyOn(service, 'checkUserExist')
//         .mockImplementation(async () => null);

//       await expect(service.authenticate(authenticateDto)).rejects.toThrowError(
//         UnauthorizedException,
//       );
//     });
//   });
// });
