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
  UseGuards,
  Redirect,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
// @UseGuards(RoleGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //auth/register
  @Get('register')
  // @Redirect('https://google.com', 301)
  // @UseGuards(RoleGuard)
  // @UseFilters(new HttpExceptionFilter())
  register(@Body() createAuthDto: CreateAuthDto, @Query() querys: any) {
    console.log({ querys });

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
