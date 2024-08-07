import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { IdPGuard } from './guard/idp.guard';
import { GroupsGuard } from './guard/groups.guard';
import { GetUser } from './decorator/getUser.decorator';
import { User } from '@prisma/client';
import { ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: 'Login request',
    description:
      'idp login을 요청합니다. 그 결과 redirect url까지 이동하여, idp groups token을 발급받습니다.',
  })
  @Get()
  @UseGuards(IdPGuard)
  loginRequest(): void {}

  @ApiOperation({
    summary: 'Login callback',
    description:
      'idp login에서 callback을 받아서, idp groups token을 발급받습니다.',
  })
  @Get('callback')
  @UseGuards(IdPGuard)
  login(@Req() req: any): any {
    return req.user;
  }

  @ApiOperation({
    summary: 'Get user information',
    description:
      '사용자 정보를 조회합니다. 이떄, 사용자 정보는 groups에 저장된 정보만을 가져옵니다.',
  })
  @ApiOAuth2(['openid', 'email', 'profile'])
  @Get('info')
  @UseGuards(GroupsGuard)
  getUserInfo(@GetUser() user: User): any {
    return user;
  }
}
