import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { UsersService } from 'src/users';
import { INestApplicationContext } from '@nestjs/common';

type UserData = Omit<User, 'password' | 'currentHashedRefreshToken'>;

export interface CustomSocket extends Socket {
  user: UserData;
}

export class AuthAdapter extends IoAdapter {
  private usersService: UsersService;

  constructor(private app: INestApplicationContext) {
    super(app);
    app.resolve<UsersService>(UsersService).then((usersService) => {
      this.usersService = usersService;
    });
  }
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, { ...options, cors: true });
    server.use((socket: CustomSocket, next) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        verify(
          socket.handshake.query.token as string,
          process.env.JWT_ACCESS_TOKEN_SECRET,
          async (err, decoded) => {
            if (err) {
              next(new Error('Authentication error'));
            } else {
              const userId = (decoded as any).userId;

              const { currentHashedRefreshToken, password, ...user } =
                await this.usersService.getById(userId);

              socket.user = user;
              next();
            }
          },
        );
      } else {
        next(new Error('Authentication error'));
      }
    });
    return server;
  }
}
