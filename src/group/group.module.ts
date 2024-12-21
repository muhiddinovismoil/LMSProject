import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupRepository } from './repository/group.repository';
import { DatabaseModule } from '../database/database.module';
import { groupProvider } from './group.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupRepository, ...groupProvider, GroupService],
  exports: [GroupRepository],
})
export class GroupModule {}
