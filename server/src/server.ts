import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db.js";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

// Defense in depth: every route is now wrapped in asyncHandler, so this
// *shouldn't* ever fire from a request anymore — but if it does (e.g. an
// error inside a non-request context, or something outside a route handler
// entirely), this makes it loud and visible instead of the process just
// silently vanishing, which is what made this bug so confusing to track down.
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED PROMISE REJECTION — this would have silently killed the server before:");
  console.error(reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(err);
});

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
