import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsRepository } from './contacts.repository';
import { ContactGroupRepository } from './contactgroups.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ContactsRepository, ContactGroupRepository])
  ],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule { }
