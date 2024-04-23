import { Test, TestingModule } from '@nestjs/testing';
import { IdpService } from '../../src/idp/idp.service';
import { testConfigModule } from 'test/config/testConfig.module';
import { HttpModule } from '@nestjs/axios';

describe('IdpService', () => {
  let service: IdpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [testConfigModule, HttpModule],
      providers: [IdpService],
    }).compile();

    service = module.get<IdpService>(IdpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserInfo', () => {
    it('should return user info', async () => {});
  });
});
