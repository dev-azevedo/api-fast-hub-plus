import { IsUUID } from "class-validator";
import CreateEventDto from "./createEvent.dto.js";

class UpdateEventDto extends CreateEventDto {
    @IsUUID()
    id!: string;
}

export default UpdateEventDto;