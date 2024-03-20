import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from 'src/user/user.repository';
import { testConfigModule } from 'test/config/testConfig.module';
import { v4 as uuidv4 } from 'uuid';

describe('UserRepository', () => {
  const uuid = uuidv4();
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [testConfigModule, PrismaModule],
      providers: [UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = await repository.createUser({ uuid });
      expect(user).toBeDefined();
      expect(user.uuid).toBe(uuid);
    });
    it('should throw conflict exception if user already exists', async () => {
      await expect(repository.createUser({ uuid })).rejects.toThrow(
        ConflictException,
      );
    });
    it('should throw internal server error if unknown error occurs', async () => {
      await expect(repository.createUser({ uuid: '' })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getUserByUuid', () => {
    it('should get the user by uuid', async () => {
      const user = await repository.getUserByUuid({ uuid });
      expect(user).toBeDefined();
      expect(user?.uuid).toBe(uuid);
    });
    it('should return null if user not found', async () => {
      const user = await repository.getUserByUuid({ uuid: uuidv4() });
      expect(user).toBeNull();
    });
  });
});
