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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exceptions/ http-exception.filter';
import { Request } from 'express';
import { Public } from './guard/public.guard';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/ decorators/roles.decorator';
import { useContainer } from 'class-validator';
import { ExceptionInterceptor } from './user.interceptor';

interface MyRequest extends Request {
  user: any;
}

// @UseGuards(RoleGuard)
// @UseGuards(AuthGuard)
// /@UseInterceptors(UserInterceptor)
@UseInterceptors(ExceptionInterceptor)
@Controller('user')
@UseFilters(new HttpExceptionFilter('user'))
export class UserController {
  private readonly logger = new Logger(useContainer.name);

  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  // @UseGuards(AuthGuard)
  // @UseFilters(new HttpExceptionFilter())
  findAll(@Req() req: MyRequest) {
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    // throw new BadRequestException('Custom exception test ', 404, {
    //   cause: new Error('A'),
    //   description: 'some descs',
    // });
    // this.logger.log('HELLO NESTJS');
    this.logger.log(req.user);

    return this.userService.findAll();
  }

  @Public()
  @Get(':id')
  // findOne(@Param('id', ParseFloatPipe) id: number) {
  findOne(@Param('id') id: string) {
    if (+id == 1) throw new Error('id must be greter than 1');
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
