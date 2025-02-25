import { EventParty, Prisma, PrismaClient, Reservation, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import BaseRepository from "shared/bases/base.repository.js";

class ReservationRepository extends BaseRepository<Reservation> {
  constructor() {
    const prisma = new PrismaClient();
    super(prisma.reservation);
  }

  public findByUserIdAndEventPartyId = async (
    userId: string,
    eventPartyId: string
  ): Promise<(Reservation & { user: User; eventParty: EventParty }) | null> => {
    return await this._model.findFirst({
      where: { userId: userId, eventPartyId: eventPartyId, active: true },
      include: { user: true, eventParty: true },
    });
  };

  public create = async (
    reservation: Omit<Reservation, "userId" | "eventPartyId">,
    userId: string,
    eventPartyId: string
  ): Promise<Reservation> => {
    return await this._model.create({
      data: {
        ...reservation,
        user: { connect: { id: userId } },
        eventParty: { connect: { id: eventPartyId } },
      },
    });
  };

  public update = async (reservation: Reservation): Promise<Reservation> => {
    return await this._model.update({
      where: { id: reservation.id },
      data: reservation,
    });
  };
}

export default ReservationRepository;