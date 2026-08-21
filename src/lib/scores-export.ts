import { z } from "zod";
import type { PlayerList } from "@/store/features/playerSlice";
import type { ScoreTracker } from "@/store/features/scoreSlice";

const EXPORT_VERSION = 1;

export const ScoresExportSchema = z.object({
    version: z.literal(EXPORT_VERSION),
    exportedAt: z.number(),
    players: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            hidden: z.boolean().optional(),
        })
    ),
    scores: z.array(
        z.object({
            id: z.string(),
            scores: z.array(
                z.object({
                    id: z.string(),
                    val: z.number(),
                    createdAt: z.number().optional(),
                })
            ),
        })
    ),
});

export type ScoresExport = z.infer<typeof ScoresExportSchema>;

export function buildScoresExport(
    players: PlayerList,
    scores: ScoreTracker
): ScoresExport {
    return { version: EXPORT_VERSION, exportedAt: Date.now(), players, scores };
}

export function downloadScoresExport(data: ScoresExport) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const date = new Date(data.exportedAt).toISOString().slice(0, 10);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rastreo-scores-${date}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

export function parseScoresImport(json: string): ScoresExport {
    return ScoresExportSchema.parse(JSON.parse(json));
}
