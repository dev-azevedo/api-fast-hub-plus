import express, { Request, Response } from 'express';
import userRoutes from './modules/users/user.routes.js';
import eventRoutes from './modules/events/eventParty.routes.js';
import reservationRoutes from './modules/reservations/reservation.routes.js';


const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use("/api", eventRoutes);
app.use("/api", reservationRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! 123');
});


export default app;