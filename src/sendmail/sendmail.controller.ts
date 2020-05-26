import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendmailService } from './sendmail.service';
import { SendMailDto } from './dto/sendmail.dto';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('sendmail')
@UseGuards(AuthGuard())
export class SendmailController {
  constructor(private sendMailSevice: SendmailService) { }

  @Post()
  async sendMail(
    @Body() sendMailDto: SendMailDto,
    @GetUser() user: User
  ) {
    return this.sendMailSevice.sendMail(sendMailDto, user);
  }
}
