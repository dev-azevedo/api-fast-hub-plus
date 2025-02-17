import { IsNumber, IsUUID, Min } from "class-validator";

class CreateReservationDto {
    @IsUUID()
    userId!: string;
    
    @IsUUID()
    eventPartyId!: string;
    
    @IsNumber()
    @Min(1)
    amountReservations!: number;
    active: boolean = true;
}

export default CreateReservationDto;