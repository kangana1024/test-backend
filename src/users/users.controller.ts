import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserLoginDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/signup')
    signup(@Body(ValidationPipe) userDto: UserDto) {
        return this.usersService.signUp(userDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userDto: UserLoginDto) {
        return this.usersService.signIn(userDto);
    }
}
