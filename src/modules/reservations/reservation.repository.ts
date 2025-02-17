import { Prisma, PrismaClient, Reservation } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

class ReservationRepository {
  private readonly _model: Prisma.ReservationDelegate<
    DefaultArgs,
    Prisma.PrismaClientOptions
  >;

  constructor() {
    const prisma = new PrismaClient();
    this._model = prisma.reservation;
  }

  public findAll = async (): Promise<Reservation[]> => {
    return await this._model.findMany({ where: { active: true } });
  };

  public findById = async (id: string): Promise<Reservation | null> => {
    return await this._model.findUnique({
      where: { id, active: true },
    });
  };

  public create = async (
    reservation: Reservation
  ): Promise<Reservation> => {
    return await this._model.create({
      data: reservation,
    });
  };

  public update = async (
    reservation: Reservation
  ): Promise<Reservation> => {
    return await this._model.update({
      where: { id: reservation.id },
      data: reservation,
    });
  };

  public deactive = async (id: string): Promise<void> => {
    await this._model.update({
      where: { id: id },
      data: { active: false },
    });
  };
  
}

export default ReservationRepository;