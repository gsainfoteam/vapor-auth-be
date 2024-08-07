import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOAuth2,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDto } from './dto/req/createGroup.dto';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { User } from '@prisma/client';
import { GroupsGuard } from 'src/auth/guard/groups.guard';
import { GroupListResDto, GroupResDto } from './dto/res/groupRes.dto';
import { InviteCodeResDto } from './dto/res/inviteCodeRes.dto';

@ApiTags('group')
@ApiOAuth2(['openid', 'email', 'profile'])
@Controller('group')
@UseGuards(GroupsGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({
    summary: 'Get all groups',
    description: '자신이 속한 모든 그룹을 가져오는 API 입니다.',
  })
  @ApiOkResponse({ type: [GroupListResDto] })
  @ApiInternalServerErrorResponse()
  @Get()
  async getGroupList(@GetUser() user: User): Promise<GroupListResDto> {
    return this.groupService.getGroupList(user.uuid);
  }

  @ApiOperation({
    summary: 'Get a group',
    description: '특정 그룹을 가져오는 API 입니다.',
  })
  @ApiOkResponse({ type: GroupResDto })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Get(':uuid')
  async getGroup(
    @Param('uuid') uuid: string,
    @GetUser() user: User,
  ): Promise<GroupResDto> {
    return this.groupService.getGroup(uuid, user.uuid);
  }

  @ApiOperation({
    summary: 'Create a group',
    description:
      '그룹을 만드는 API 입니다. 이를 통해 만들어지 그룹의 장과, 그룹의 모든 권한은 그룹을 만든 사람에게 부여됩니다.',
  })
  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async createGroup(
    @Body() body: CreateGroupDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.groupService.createGroup(body, user.uuid);
  }

  @ApiOperation({
    summary: 'Delete a group',
    description:
      '그룹을 삭제하는 API 입니다. 삭제시 그룹의 모든 정보가 삭제됩니다.',
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':uuid')
  async deleteGroup(
    @Param('uuid') uuid: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.groupService.deleteGroup(uuid, user.uuid);
  }

  @ApiOperation({
    summary: 'Create an invite code',
    description:
      '그룹에 초대 코드를 만드는 API 입니다. 초대 코드를 통해 그룹에 가입할 수 있습니다.',
  })
  @ApiCreatedResponse({ type: InviteCodeResDto })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Post(':uuid/invite')
  async createInviteCode(
    @Param('uuid') uuid: string,
    @GetUser() user: User,
  ): Promise<InviteCodeResDto> {
    return this.groupService.createInviteCode(uuid, user.uuid);
  }

  @ApiOperation({
    summary: 'Join a group',
    description: '그룹에 가입하는 API 입니다.',
  })
  @ApiCreatedResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Post('join')
  async joinGroup(
    @Body('code') code: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.groupService.joinMember(code, user.uuid);
  }

  @ApiOperation({
    summary: 'delete a member',
    description: '그룹에 멤버를 추방하는 API 입니다.',
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':uuid/member/:targetUuid')
  async removeMember(
    @Param('uuid') uuid: string,
    @Param('targetUuid') targetUuid: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.groupService.removeMember(uuid, targetUuid, user.uuid);
  }

  @ApiOperation({
    summary: 'grant a role',
    description: '그룹의 멤버의 역할을 추가하는 API 입니다.',
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':uuid/member/:targetUuid/role')
  async grantRoleToUser(
    @Param('uuid') uuid: string,
    @Param('targetUuid') targetUuid: string,
    @Query('roleId', ParseIntPipe) roleId: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.groupService.grantRole(uuid, targetUuid, roleId, user.uuid);
  }

  @ApiOperation({
    summary: 'Delete a role',
    description: '그룹의 멤버의 역할을 삭제하는 API 입니다.',
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':uuid/member/:targetUuid/role')
  async revokeRoleFromUser(
    @Param('uuid') uuid: string,
    @Param('targetUuid') targetUuid: string,
    @Query('roleId', ParseIntPipe) roleId: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.groupService.revokeRole(uuid, targetUuid, roleId, user.uuid);
  }
}
