import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  type CreateUserDto,
  CreateUserUseCase,
} from '../application/use-cases/create-user.use-case';
import { User } from '../domain/entities/user.entity';
import { UserId } from '../domain/value-objects/user-id.vo';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import {
  type UpdateUserDto,
  UpdateUserUseCase,
} from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Get()
  async listUsers() {
    const users = await this.listUsersUseCase.execute();
    return users.map((user) => this.mapUserToResponse(user));
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.getUserUseCase.execute(new UserId(id));
    return this.mapUserToResponse(user);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(dto);
    return this.mapUserToResponse(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(new UserId(id), dto);
    return this.mapUserToResponse(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(new UserId(id));
    return { message: 'User deleted successfully' };
  }

  private mapUserToResponse(user: User) {
    return {
      id: user.getId().getValue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpatedAt(),
      age: user.getAccountAge(),
    };
  }
}
