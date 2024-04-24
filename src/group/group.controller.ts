import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { UserGuard } from 'src/user/guard/user.guard';
import { GetGroupListRequestDto } from './dto/req/getGroupListRequest.dto';
import { GetUser } from 'src/user/decorator/getUser.decorator';
import { User } from '@prisma/client';
import { CreateGroupDto } from './dto/req/createGroup.dto';
import { UpdateGroupDto } from './dto/req/updateGroup.dto';
import { AddGroupMemberDto } from './dto/req/addGroupMemeber.dto';

@ApiTags('group')
@Controller('group')
@UsePipes(new ValidationPipe({ transform: true }))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // 테스트 완료
  @Get()
  @UseGuards(UserGuard)
  async getGroupList(
    @Query() getGroupListRequestDto: GetGroupListRequestDto,
    @GetUser() user?: User,
  ) {
    return this.groupService.getGroupList(getGroupListRequestDto, user?.uuid);
  }

  // 테스트 완료
  @Get(':name')
  @UseGuards(UserGuard)
  async getGroup(@Param('name') name: string, @GetUser() user: User) {
    return this.groupService.getGroup(name, user.uuid);
  }

  // 테스트 완료
  @Post()
  @UseGuards(UserGuard)
  async createGroup(@Body() body: CreateGroupDto, @GetUser() user: User) {
    return this.groupService.createGroup(body, user.uuid);
  }

  // 테스트 완료
  @Patch(':name')
  @UseGuards(UserGuard)
  async updateGroup(
    @Param('name') name: string,
    @Body() body: UpdateGroupDto,
    @GetUser() user: User,
  ) {
    return this.groupService.updateGroup(name, body, user.uuid);
  }

  // 테스트 완료
  @Delete(':name')
  @UseGuards(UserGuard)
  async deleteGroup(@Param('name') name: string, @GetUser() user: User) {
    return this.groupService.deleteGroup(name, user.uuid);
  }

  // 테스트 완료
  @Get(':name/member')
  @UseGuards(UserGuard)
  async getGroupMember(@Param('name') name: string, @GetUser() user: User) {
    return this.groupService.getGroupMember(name, user.uuid);
  }

  // 테스트 완료
  @Post(':name/member')
  @UseGuards(UserGuard)
  async addGroupMember(
    @Param('name') groupName: string,
    @Body() body: AddGroupMemberDto,
    @GetUser() user: User,
  ) {
    return this.groupService.addGroupMember(groupName, body, user.uuid);
  }

  // 테스트 완료
  @Delete(':name/member/:uuid')
  @UseGuards(UserGuard)
  async deleteGroupMemeber(
    @Param('name') groupName: string,
    @Param('uuid', new ParseUUIDPipe()) deleteUserUuid: string,
    @GetUser() user: User,
  ) {
    return this.groupService.deleteGroupMember(
      groupName,
      deleteUserUuid,
      user.uuid,
    );
  }

  @Post('/:groupname/member/:uuid/role/:id')
  async addUserRole(
    @Param('groupname') groupName: string,
    @Param('uuid') userUuid: string,
    @Param('id') roleId: number,
  ) {
    return this.groupService.addUserRole({ userUuid, groupName, roleId });
  }

  @Get('/:groupname/member/:uuid/role')
  async getUserRoles(
    @Param('groupname') group_uuid: string,
    @Param('uuid') user_uuid: string,
  ) {
    return this.groupService.getUserRoles(user_uuid, group_uuid);
  }

  @Get('/:groupname/role/:id')
  async getUsersByRole(
    @Param('groupname') group_uuid: string,
    @Param('id') role_id: number,
  ) {
    return this.groupService.getUsersByRole(group_uuid, role_id);
  }

  @Delete('/group/:groupname/delete')
  async deleteGroupRoles(@Param('groupname') groupUuid: string) {
    return this.groupService.deleteGroupRoles(groupUuid);
  }

  @Delete('/member/:uuid/delete')
  async deleteUserRoles(@Param('uuid') userUuid: string) {
    return this.groupService.deleteUserRoles(userUuid);
  }

  @Delete('/group/:groupname/member/:uuid/delete')
  async deleteGroupMemberRoles(
    @Param('groupname') groupUuid: string,
    @Param('uuid') userUuid: string,
  ) {
    return this.groupService.deleteGroupMemberRoles(groupUuid, userUuid);
  }
}
