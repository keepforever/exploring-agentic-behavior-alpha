import { tool } from "ai";
import { z } from "zod";

export const brianPreferencesTool = tool({
  description: "Get activity preferences for Brian",
  parameters: z.object({}),
  execute: async () => {
    // Overlapping: hiking, movies; Unique: photography
    return "Brian enjoys hiking, movies, and indulging in photography.";
  },
});

export const stevePreferencesTool = tool({
  description: "Get activity preferences for Steve",
  parameters: z.object({}),
  execute: async () => {
    // Overlapping: hiking, movies; Unique: cooking
    return "Steve loves hiking and movies, and he often experiments with cooking.";
  },
});

export const sallyPreferencesTool = tool({
  description: "Get activity preferences for Sally",
  parameters: z.object({}),
  execute: async () => {
    // Overlapping: movies, hiking; Unique: reading
    return "Sally is fond of movies and hiking, and she also enjoys reading.";
  },
});
