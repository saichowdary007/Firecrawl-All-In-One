import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getDeepResearch } from "../../lib/deep-research/deep-research-redis";

type DeepResearchStatusResponse =
  | ErrorResponse
  | {
      success: boolean;
      status: string;
      data?: any;
    };

export async function deepResearchStatusController(
  req: RequestWithAuth<{ researchId: string }, DeepResearchStatusResponse>,
  res: Response<DeepResearchStatusResponse>,
) {
  const { researchId } = req.params;

  try {
    const research = await getDeepResearch(researchId);

    if (!research) {
      return res.status(404).json({
        success: false,
        error: "Research job not found",
      });
    }

    // Check if the research belongs to the authenticated team
    if (research.team_id !== req.auth.team_id) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      status: research.status,
      data: research,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve research status",
    });
  }
}
