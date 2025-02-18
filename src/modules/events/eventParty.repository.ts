import { PrismaClient, EventParty, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import BaseRepository from "../../shared/bases/base.repository.js";

class EventPartyRepository extends BaseRepository<EventParty> {
  private readonly _modelEventParty: Prisma.EventPartyDelegate<
    DefaultArgs,
    Prisma.PrismaClientOptions
  >;

  constructor() {
    const prisma = new PrismaClient();
    super(prisma.eventParty);
    this._modelEventParty = prisma.eventParty;
  }


  public create = async (
    eventParty: Omit<EventParty, "userId">,
    userId: string
  ): Promise<EventParty> => {
    return await this._modelEventParty.create({
      data: {
        ...eventParty,
        user: { connect: { id: userId } },
      },
    });
  };

  public update = async (event: EventParty): Promise<EventParty> => {
    return await this._modelEventParty.update({
      where: { id: event.id },
      data: event,
    });
  };
}   

export default EventPartyRepository;