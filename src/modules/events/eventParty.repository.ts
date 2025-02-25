import { PrismaClient, EventParty, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import BaseRepository from "../../shared/bases/base.repository.js";

class EventPartyRepository extends BaseRepository<EventParty> {
  constructor() {
    const prisma = new PrismaClient();
    super(prisma.eventParty);
  }

  public create = async (
    eventParty: Omit<EventParty, "userId">,
    userId: string
  ): Promise<EventParty> => {
    return await this._model.create({
      data: {
        ...eventParty,
        user: { connect: { id: userId } },
      },
    });
  };

  public update = async (event: EventParty): Promise<EventParty> => {
    return await this._model.update({
      where: { id: event.id },
      data: event,
    });
  };

  public findByName = async (name: string): Promise<EventParty[]> => {
    return await this._model.findMany({
      where: { name, active: true },
    });
  };
}   

export default EventPartyRepository;