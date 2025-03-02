import { IsString, IsEmail, IsIn, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

//   @IsIn(['INTERN', 'ADMIN', 'ENGINEER'])
@IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
    message: 'Role must be either INTERN, ADMIN, or ENGINEER',
})
  role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}

