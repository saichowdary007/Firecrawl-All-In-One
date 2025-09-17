import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getGeneratedLlmsTxt } from "../../lib/generate-llmstxt/generate-llmstxt-redis";

type GenerateLLMsTextStatusResponse =
  | ErrorResponse
  | {
      success: boolean;
      status: string;
      data?: any;
    };

export async function generateLLMsTextStatusController(
  req: RequestWithAuth<{ generationId: string }, GenerateLLMsTextStatusResponse>,
  res: Response<GenerateLLMsTextStatusResponse>,
) {
  const { generationId } = req.params;

  try {
    const generation = await getGeneratedLlmsTxt(generationId);

    if (!generation) {
      return res.status(404).json({
        success: false,
        error: "Generation job not found",
      });
    }

    // Check if the generation belongs to the authenticated team
    if (generation.team_id !== req.auth.team_id) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      status: generation.status,
      data: generation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve generation status",
    });
  }
}
