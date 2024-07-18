import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Authority } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Name of the role',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: ['ROLE_CREATE'],
    description: 'Authorities for the role',
    enum: Authority,
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsEnum(Authority, { each: true })
  @IsOptional()
  authorities?: Authority[];

  @ApiPropertyOptional({
    example: ['ZIGGLE_WRITE_NOTICE'],
    description: 'External authorities for the role',
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  externalAuthorities?: string[];
}
