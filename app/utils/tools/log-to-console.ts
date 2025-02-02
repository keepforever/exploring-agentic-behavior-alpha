import { tool } from "ai";
import { z } from "zod";

/**
 * Log a message to the console
 *
 */
export const logToConsoleTool = tool({
  description: "Log a message to the console",
  parameters: z.object({
    message: z.string().describe("The message to log to the console"),
  }),
  execute: async ({ message }) => {
    console.log(message);
  },
});
