import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../ports/user.repository.port';
import { UserId } from '../../domain/value-objects/user-id.vo';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(id: UserId): Promise<void> {
    await this.userRepository.delete(id);
  }
}
