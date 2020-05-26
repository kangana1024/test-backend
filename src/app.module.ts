import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendmailModule } from './sendmail/sendmail.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeOrmConfig), SendmailModule, ContactsModule]
})
export class AppModule { }
