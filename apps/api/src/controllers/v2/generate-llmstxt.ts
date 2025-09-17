import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getGenerateLlmsTxtQueue } from "../../services/queue-service";
import * as Sentry from "@sentry/node";
import { saveGeneratedLlmsTxt } from "../../lib/generate-llmstxt/generate-llmstxt-redis";
import { z } from "zod";

const generateLLMsTextRequestSchema = z
  .object({
    url: z.string().url().describe("The URL to generate LLMs.txt from"),
    maxUrls: z
      .number()
      .min(1)
      .max(5000)
      .default(10)
      .describe("Maximum number of URLs to process"),
    showFullText: z
      .boolean()
      .default(false)
      .describe("Whether to show the full LLMs-full.txt in the response"),
    origin: z.string().optional().default("api"),
    integration: z.string().optional().default("mcp"),
  })
  .strict("Unrecognized key in body -- please review the v2 API documentation for request body changes");

type GenerateLLMsTextRequest = z.infer<typeof generateLLMsTextRequestSchema>;

type GenerateLLMsTextResponse =
  | ErrorResponse
  | {
      success: boolean;
      id: string;
    };

/**
 * Initiates a text generation job based on the provided URL.
 * @param req - The request object containing authentication and generation parameters.
 * @param res - The response object to send the generation job ID.
 * @returns A promise that resolves when the generation job is queued.
 */
export async function generateLLMsTextController(
  req: RequestWithAuth<{}, GenerateLLMsTextResponse, GenerateLLMsTextRequest>,
  res: Response<GenerateLLMsTextResponse>,
) {
  if (req.acuc?.flags?.forceZDR) {
    return res.status(400).json({
      success: false,
      error:
        "Your team has zero data retention enabled. This is not supported on llmstxt. Please contact support@firecrawl.com to unblock this feature.",
    });
  }

  req.body = generateLLMsTextRequestSchema.parse(req.body);

  const generationId = crypto.randomUUID();
  const jobData = {
    request: req.body,
    teamId: req.auth.team_id,
    subId: req.acuc?.sub_id ?? undefined,
    apiKeyId: req.acuc?.api_key_id ?? null,
    generationId,
  };

  await saveGeneratedLlmsTxt(generationId, {
    id: generationId,
    team_id: req.auth.team_id,
    createdAt: Date.now(),
    status: "processing",
    url: req.body.url,
    maxUrls: req.body.maxUrls,
    showFullText: req.body.showFullText,
    cache: true, // Always use cache for v2
    generatedText: "",
    fullText: "",
  });

  await getGenerateLlmsTxtQueue().add(generationId, jobData, {
    jobId: generationId,
  });

  return res.status(200).json({
    success: true,
    id: generationId,
  });
}
