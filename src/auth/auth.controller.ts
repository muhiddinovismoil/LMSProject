import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpCode,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //auth/register
  @Post('register')
  // @UseFilters(new HttpExceptionFilter())
  register(@Body() createAuthDto: CreateAuthDto) {
    // throw new Error('Forbidden');
    // throw new ImATeapotException();
    return this.authService.register(createAuthDto);
  }

  //auth/login
  @Post('login')
  @HttpCode(444)
  login(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.login(updateAuthDto);
  }

  @Get('profile/:id')
  profile(@Param('id', ParseIntPipe) id: number) {
    return {
      typeof: typeof id,
      id,
    };
  }
}
