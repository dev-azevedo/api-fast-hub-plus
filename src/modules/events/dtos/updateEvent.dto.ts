import { IsUUID } from "class-validator";
import CreateEventPartyDto from "./createEvent.dto.js";

class UpdateEventPartyDto extends CreateEventPartyDto {
    @IsUUID()
    id!: string;
}

export default UpdateEventPartyDto;