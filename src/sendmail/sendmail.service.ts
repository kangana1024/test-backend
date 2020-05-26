import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { SendMailDto } from './dto/sendmail.dto';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class SendmailService {
  async sendMail(sendMailDto: SendMailDto, user: User) {
    try {
      const header = {
        headers: {
          Authorization: "Bearer " + process.env.EMAIL_TOKEN,
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('https://api.sendgrid.com/v3/mail/send', JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: sendMailDto.email
              }
            ]
          }
        ],
        subject: "Test, Sendmail!",
        content: [
          {
            "type": "text/html",
            "value": sendMailDto.message
          }
        ],
        from: {
          email: user.email,
        }
      }), header);
      const { result, code } = res.data;
      console.log(result, code);
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }
}
