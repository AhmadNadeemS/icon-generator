import { createTRPCRouter } from "~/server/api/trpc";
import { generateRouter } from "./routers/generate";
import { checkoutRouter } from "./routers/checkout";

export const appRouter = createTRPCRouter({
  generate: generateRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
