import type { NextFunction, Request, RequestHandler, Response } from "express";

// Express 4 does NOT automatically catch a rejected promise thrown inside an
// async route handler. Left unwrapped, that rejection becomes an
// "unhandled promise rejection" — and Node.js (v15+) terminates the entire
// process by default when that happens, not just the one request.
//
// Wrapping every async handler with this ensures any error inside it is
// routed to `next(err)`, which Express's error-handling middleware
// (errorHandler in middleware/error-handler.ts) can turn into a normal
// JSON error response — instead of silently killing the server.
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
