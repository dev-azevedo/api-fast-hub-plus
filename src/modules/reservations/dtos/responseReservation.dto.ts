class ResponseReservationDto {
    id!: string;
    userId!: string;
    eventPartyId!: string;
    amountReservations!: number;
    createdAt!: Date;
}

export default ResponseReservationDto;