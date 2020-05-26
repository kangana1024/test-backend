import { IsString } from "class-validator";


export class CreateContactGroupsDto {
  @IsString()
  name: string;
}
