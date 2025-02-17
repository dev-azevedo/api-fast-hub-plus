import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import CreateEventPartyDto from "./createEvent.dto.js";

class UpdateEventPartyDto {
    @IsUUID()
    id!: string;

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
    amountReservations!: number;    
}

export default UpdateEventPartyDto;