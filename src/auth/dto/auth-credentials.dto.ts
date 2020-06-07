import { IsString, MinLength, MaxLength, Matches } from "class-validator";

const checkLower = '(?=.*[a-z])'
const checkUpper = '(?=.*[A-Z])'
const checkNumber = '(?=.*\d)'
const checkSymbol = '(?=.*?[#?!@$%^&*-])'

const passwordRegex = new RegExp(`${checkLower}${checkUpper}${checkNumber}${checkSymbol}`, "g")


export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(passwordRegex, { message: "password is too weak. " })
  password: string;
}