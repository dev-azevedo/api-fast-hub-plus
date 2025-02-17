import { PrismaClient, EventParty, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

class EventPartyRepository {
  private readonly _model: Prisma.EventPartyDelegate<
    DefaultArgs,
    Prisma.PrismaClientOptions
  >;

  constructor() {
    const prisma = new PrismaClient();
    this._model = prisma.eventParty;
  }

  public findAll = async (): Promise<EventParty[]> => {
    return await this._model.findMany({
      where: { active: true },
    });
  };

  public findById = async (
    id: string
  ): Promise<EventParty | null> => {
    return await this._model.findUnique({
      where: { id, active: true },
    });
  };

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

  public deactive = async (id: string): Promise<void> => {
    await this._model.update({
      where: { id: id },
      data: { active: false },
    });
  };
}   

export default EventPartyRepository;