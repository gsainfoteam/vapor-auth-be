import { Injectable, Logger } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { GetRoleListResDto } from './dto/res/getRoleRes.dto';
import { CreateRoleDto } from './dto/req/createRole.dto';
import { UpdateRoleDto } from './dto/req/updateRole.dto';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);
  constructor(private readonly roleRepository: RoleRepository) {}

  /**
   * this method retrieves the list of roles for a group
   * @param groupUuid the uuid of the group
   * @param userUuid the uuid of the user
   * @returns the list of roles for the group
   */
  async getRoles(
    groupName: string,
    userUuid: string,
  ): Promise<GetRoleListResDto> {
    this.logger.log(`Retrieving roles for group ${groupName}`);
    return {
      list: await this.roleRepository.getRoles({ name: groupName }, userUuid),
    };
  }

  /**
   * this method creates a role for a group
   * @param groupName
   * @param createRoleDto object containing the role name and optionally it may containing authorities and external authorities
   * @param userUuid the uuid of the user
   * @returns the created role
   */
  async createRole(
    groupName: string,
    createRoleDto: CreateRoleDto,
    userUuid: string,
  ): Promise<void> {
    this.logger.log(`Creating role`);
    await this.roleRepository.createRole(
      { groupName, ...createRoleDto },
      userUuid,
    );
  }

  /**
   * this method updates a role for a group
   * @param groupName the name of the group
   * @param id the id of the role
   * @param updateRoleDto object containing the role name and optionally it may containing authorities and external authorities
   * @param userUuid the uuid of the user
   */
  async updateRole(
    groupName: string,
    id: number,
    updateRoleDto: UpdateRoleDto,
    userUuid: string,
  ): Promise<void> {
    this.logger.log(`Updating role`);
    await this.roleRepository.updateRole(
      { id, groupName, ...updateRoleDto },
      userUuid,
    );
  }

  /**
   * this method deletes a role for a group
   * @param groupName the name of the group
   * @param id the id of the role
   * @param userUuid the uuid of the user
   */
  async deleteRole(
    groupName: string,
    id: number,
    userUuid: string,
  ): Promise<void> {
    this.logger.log(`Deleting role ${id} for group ${groupName}`);
    await this.roleRepository.deleteRole({ groupName, id }, userUuid);
  }
}
