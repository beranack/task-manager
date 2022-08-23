import { IsNotEmpty } from "class-validator";

// dto baraye gereftan vorodi va tamiz kardane code haye rajebe body dakhele controller
export class CreateTaskDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}