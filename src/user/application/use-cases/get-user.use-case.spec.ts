import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { GetUserUseCase } from './get-user.use-case';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let findById: jest.Mock;

  const existingUser = new User(
    new UserId('user-123'),
    'Test User',
    new Email('test@example.com'),
    new Date('2026-01-01'),
    new Date('2026-01-01')
  );

  beforeEach(async () => {
    findById = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: { findById },
        },
      ],
    }).compile();

    useCase = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should return user when found', async () => {
    findById.mockResolvedValue(existingUser);

    const result = await useCase.execute(new UserId('user-123'));

    expect(result).toBe(existingUser);
    expect(findById).toHaveBeenCalledTimes(1);
    const calls = findById.mock.calls as Array<[UserId]>;
    const idArg = calls[0][0];
    expect(idArg).toBeInstanceOf(UserId);
    expect(idArg.getValue()).toBe('user-123');
  });

  it('should throw NotFoundException when user does not exist', async () => {
    findById.mockResolvedValue(null);

    await expect(
      useCase.execute(new UserId('non-existent-id'))
    ).rejects.toThrow(NotFoundException);

    await expect(
      useCase.execute(new UserId('non-existent-id'))
    ).rejects.toThrow('User not found');

    expect(findById).toHaveBeenCalledTimes(2);
  });
});
