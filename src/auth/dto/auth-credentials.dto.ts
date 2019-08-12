import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, {
    message: 'Nome do usuário deve conter no mínimo 4 caracteres.',
  })
  @MaxLength(20, {
    message: 'Nome do usuário deve conter no máximo 20 caracteres.',
  })
  username: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve conter no mínimo 8 caracteres.' })
  @MaxLength(20, { message: 'A senha deve conter no máximo 20 caracteres.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter caracteres Maículos, minúsculos e números.',
  })
  password: string;
}
