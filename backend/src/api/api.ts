import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const apiLocation = process.env.API_LOCATION ?? "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from the GCAR REGLAMENT SYSTEM API Server!");
});

app.get(`${apiLocation}/status`, (req: Request, res: Response) => {
  res.status(200).json({
    status: "Server is up and running!",
    timestamp: new Date().toISOString(),
  });
});

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
  });
};
