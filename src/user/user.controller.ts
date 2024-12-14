import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseFilters,
  ParseArrayPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exceptions/ http-exception.filter';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

interface MyRequest extends Request {
  user: any;
}

@Controller('user')
@UseFilters(new HttpExceptionFilter('user'))
export class UserController {
  private readonly logger = new Logger('User');
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  // @UseFilters(new HttpExceptionFilter())
  findAll(@Req() req: MyRequest) {
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    // throw new BadRequestException('Custom exception test ', 404, {
    //   cause: new Error('A'),
    //   description: 'some descs',
    // });
    // this.logger.log('HELLO NESTJS');
    console.log(req.user);

    return this.userService.findAll();
  }

  @Get(':id')
  // findOne(@Param('id', ParseFloatPipe) id: number) {
  findOne(@Param('id', ParseArrayPipe) id: string) {
    return {
      id,
      typeofId: typeof id,
    };
    // return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
