import { IsDateString, IsNumber, IsString, Length, Min } from "class-validator";

class CreateEventDto {
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsString()
  @Length(3, 255)
  description!: string;

  @IsDateString()
  eventDate!: Date;

  @IsNumber()
  @Min(1)
  amountTickets!: number;

  @IsNumber()
  @Min(0)
  amountReservations: number = 0;
  active: boolean = true;
}

export default CreateEventDto;