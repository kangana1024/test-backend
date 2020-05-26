import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(userDto: UserDto): Promise<void> {
        return this.userRepository.signUp(userDto);
    }
    async signIn(userDto: UserDto): Promise<{ accessToken }> {
        const username = await this.userRepository.signIn(userDto);

        if (!username) {
            throw new UnauthorizedException("Invalid user data");
        }

        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
