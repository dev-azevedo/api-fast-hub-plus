class ResponseEventDto {
    id!: string;
    name!: string;
    description!: string;
    eventDate!: Date;
    amountTickets!: number;
    amountReservations!: number;
    createdAt!: Date;
}

export default ResponseEventDto;