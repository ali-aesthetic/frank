import Anthropic from "@anthropic-ai/sdk";

/**
 * Anthropic SDK — use `claude-haiku-4-5` for most calls and `claude-sonnet-4-6` for analysis.
 * Set ANTHROPIC_API_KEY in the environment before making requests.
 */
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});
