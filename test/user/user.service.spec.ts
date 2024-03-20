import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { testConfigModule } from 'test/config/testConfig.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdpModule } from 'src/idp/idp.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [testConfigModule, PrismaModule, IdpModule],
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
