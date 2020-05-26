import { Module } from '@nestjs/common';
import { SendmailController } from './sendmail.controller';
import { SendmailService } from './sendmail.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [SendmailController],
  providers: [SendmailService]
})
export class SendmailModule { }
