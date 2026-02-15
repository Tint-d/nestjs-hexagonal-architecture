import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../ports/user.repository.port';
import type { UserRepositoryPort } from '../ports/user.repository.port';

export interface CreateUserDto {
  name: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(dto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const user = User.create(dto.name, dto.email);
    return this.userRepository.save(user);
  }
}
