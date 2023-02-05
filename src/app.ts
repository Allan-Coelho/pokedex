import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from '@/configuration';
import { authenticationRouter } from './routers/authentication-router';
import { poketeamRouter } from './routers/poketeam-router';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/authentication', authenticationRouter)
  .use('/teams', poketeamRouter)
  .get('/health', (_req, res) => res.send('OK!'));

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
