import express, { Request, Response } from 'express';
import userRoutes from 'modules/users/user.routes.js';


const app = express();
app.use(express.json());
app.use('/api', userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! 123');
});


export default app;