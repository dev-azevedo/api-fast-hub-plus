import { IsNumber, IsUUID, Min } from "class-validator";

class UpdateReservationDto {
    @IsUUID()
    id!: string;

    @IsUUID()
    userId!: string;
    
    @IsUUID()
    eventPartyId!: string;
    
    @IsNumber()
    @Min(1)
    amountReservations!: number;
}

export default UpdateReservationDto;