import { IsString, MinLength, MaxLength, Matches } from "class-validator";

const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])[a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]*/

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(regex, { message: "password is too weak. " })
  password: string;
}