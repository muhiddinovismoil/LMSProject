import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';
import { resetPasswordSchem } from '../auth/dto/update-password';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/enums/role';

@Controller('user')
export class UserController {
  constructor(
    private readonly imageKitService: ImageKitService,
    private readonly userService: UserService,
  ) {}
  @Get('/me/:id')
  getMe(@Param('id') id: string) {
    return this.userService.getProfile(+id);
  }
  @Put('/update/:id')
  updateData(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Patch('/updatePassword')
  update(@Body() updatePassDto: resetPasswordSchem) {
    return this.userService.updatePass(updatePassDto);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.manager)
  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post('/avatar/:id')
  // @UseInterceptors(
  //   FileInterceptor('avatar', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: function (req, file, cb) {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         console.log(file);
  //         cb(
  //           null,
  //           file.fieldname +
  //             '-' +
  //             uniqueSuffix +
  //             '.' +
  //             file.originalname.split('.')[1],
  //         );
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(@UploadedFile() file, @Param('id') id: string) {
    const fileBase64 = file.buffer.toString('base64');
    const result = await this.imageKitService.upload({
      file: fileBase64,
      fileName: file.originalname,
    });
    return await this.userService.setLogo(+id, result.thumbnailUrl);
  }
}
