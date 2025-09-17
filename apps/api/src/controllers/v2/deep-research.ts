import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getDeepResearchQueue } from "../../services/queue-service";
import * as Sentry from "@sentry/node";
import { saveDeepResearch } from "../../lib/deep-research/deep-research-redis";
import { z } from "zod";

const deepResearchRequestSchema = z
  .object({
    query: z.string().max(10000).describe("The query or topic to research"),
    maxDepth: z
      .number()
      .min(1)
      .max(12)
      .default(3)
      .describe("Maximum recursive depth for crawling/search"),
    timeLimit: z
      .number()
      .min(30)
      .max(600)
      .default(120)
      .describe("Time limit in seconds for the research session"),
    maxUrls: z
      .number()
      .min(1)
      .max(1000)
      .default(50)
      .describe("Maximum number of URLs to analyze"),
    origin: z.string().optional().default("api"),
    integration: z.string().optional().default("mcp"),
  })
  .strict("Unrecognized key in body -- please review the v2 API documentation for request body changes");

type DeepResearchRequest = z.infer<typeof deepResearchRequestSchema>;

type DeepResearchResponse =
  | ErrorResponse
  | {
      success: boolean;
      id: string;
    };

/**
 * Initiates a deep research job based on the provided query.
 * @param req - The request object containing authentication and research parameters.
 * @param res - The response object to send the research job ID.
 * @returns A promise that resolves when the research job is queued.
 */
export async function deepResearchController(
  req: RequestWithAuth<{}, DeepResearchResponse, DeepResearchRequest>,
  res: Response<DeepResearchResponse>,
) {
  if (req.acuc?.flags?.forceZDR) {
    return res.status(400).json({
      success: false,
      error:
        "Your team has zero data retention enabled. This is not supported on deep research. Please contact support@firecrawl.com to unblock this feature.",
    });
  }

  req.body = deepResearchRequestSchema.parse(req.body);

  const researchId = crypto.randomUUID();
  const jobData = {
    request: req.body,
    teamId: req.auth.team_id,
    subId: req.acuc?.sub_id ?? undefined,
    apiKeyId: req.acuc?.api_key_id ?? null,
    researchId,
  };

  await saveDeepResearch(researchId, {
    id: researchId,
    team_id: req.auth.team_id,
    createdAt: Date.now(),
    status: "processing",
    currentDepth: 0,
    maxDepth: req.body.maxDepth,
    completedSteps: 0,
    totalExpectedSteps: req.body.maxDepth * 5, // 5 steps per depth level
    findings: [],
    sources: [],
    activities: [],
    summaries: [],
  });

  await getDeepResearchQueue().add(researchId, jobData, {
    jobId: researchId,
  });

  return res.status(200).json({
    success: true,
    id: researchId,
  });
}
