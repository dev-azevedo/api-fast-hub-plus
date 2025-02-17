import { IsNumber, IsUUID, Min } from "class-validator";

class UpdateReservationDto {
    @IsUUID()
    userId!: string;
    
    @IsUUID()
    eventPartyId!: string;
    
    @IsNumber()
    @Min(1)
    amountReservations!: number;
}
