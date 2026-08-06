import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";

import venuesRouter from "./routes/venues.routes.js";
import gamesRouter from "./routes/games.routes.js";
import sportsRouter from "./routes/sports.routes.js";
import webhooksRouter from "./routes/webhooks.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") ?? "http://localhost:3000",
    credentials: true,
  }),
);
app.use(morgan("dev"));

// Webhooks are mounted BEFORE express.json(), because Clerk's signature
// verification (svix) needs the raw, unparsed request body. Everything else
// mounted after express.json() gets a normal parsed req.body as usual.
app.use("/api/webhooks", webhooksRouter);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/venues", venuesRouter);
app.use("/api/games", gamesRouter);
app.use("/api/sports", sportsRouter);

app.use(errorHandler);

export default app;
