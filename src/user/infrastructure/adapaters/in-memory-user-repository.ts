import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../application/ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();

  async save(user: User): Promise<User> {
    this.users.set(user.getId().getValue(), user);
    return user;
  }

  async findById(id: UserId): Promise<User | null> {
    console.log('this user', this.users);
    return this.users.get(id.getValue()) ?? null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    return (
      Array.from(this.users.values()).find((user) =>
        user.getEmail().equals(email)
      ) ?? null
    );
  }

  async delete(id: UserId): Promise<void> {
    this.users.delete(id.getValue());
  }

  async update(user: User): Promise<void> {
    this.users.set(user.getId().getValue(), user);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}
