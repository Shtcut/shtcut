import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DefaultPermissions,
  Permissions,
  PermissionsDocument,
  PermissionsSchema,
  Role,
  RoleDocument,
  RoleSchema,
  Roles,
  Utils,
} from 'shtcut/core';
import { PermissionController, RoleController } from './controller';
import { PermissionService, RoleService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permissions.name, schema: PermissionsSchema },
    ]),
  ],
  controllers: [RoleController, PermissionController],
  providers: [RoleService, PermissionService],
  exports: [RoleService, PermissionService],
})
export class SecurityModule implements OnModuleInit {
  constructor(
    @InjectModel(Role.name) protected roleModel: Model<RoleDocument>,
    @InjectModel(Permissions.name) protected permissionsModel: Model<PermissionsDocument>,
    protected config: ConfigService,
  ) {}

  async createDefaultRole(title) {
    const permissions = await this.createDefaultPermissionByTitle(title);
    return this.roleModel.findOneAndUpdate(
      { title },
      {
        $setOnInsert: {
          title,
          publicId: Utils.generateUniqueId('role'),
          permissions,
        },
        isDefault: true,
      },
      {
        ...Utils.mongoDefaultUpdateProps(),
      },
    );
  }

  async createDefaultPermissionByTitle(title) {
    try {
      const defaultPermissions = DefaultPermissions[title];
      const permissions = [];
      if (defaultPermissions) {
        const keys: string[] = Object.values(defaultPermissions);
        for (const key of keys) {
          const permission = await this.permissionsModel.findOneAndUpdate(
            { key },
            {
              $setOnInsert: {
                publicId: Utils.generateUniqueId('permissions'),
                title: `${key.split('_').join(' ')}`,
                key,
              },
            },
            {
              ...Utils.mongoDefaultUpdateProps(),
            },
          );
          permissions.push(permission._id);
        }
      }
      return permissions;
    } catch (e) {}
  }

  isNotSameRole(defaultRole: string[], currentRoles: string[]) {
    return defaultRole.every((d) => currentRoles.includes(d));
  }

  async onModuleInit() {
    try {
      let roles: Role[] = await this.roleModel.find({ isDefault: true });
      const defaultRoles = [Roles.ADMIN, Roles.OWNER];
      const rolesTitles = roles.map((r) => r.title);
      if (rolesTitles.length < defaultRoles.length || !this.isNotSameRole(defaultRoles, rolesTitles)) {
        roles = await Promise.all([this.createDefaultRole(Roles.OWNER), this.createDefaultRole(Roles.ADMIN)]);
      }
    } catch (e) {}
  }
}
