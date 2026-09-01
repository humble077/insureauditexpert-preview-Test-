/**
 * CDN-hosted cinematic clips (generated assets, see src/assets/video/*.asset.json).
 *
 * The `/__l5e/assets-v1/...` path is only served by Lovable hosting, so on
 * external hosts (Vercel) it 404s and the video renders black. We therefore
 * always point at the absolute Lovable asset origin, which works everywhere.
 */
const CDN = "https://audacious-audit-spark.lovable.app";

const asset = (path: string) => `${CDN}${path}`;

export const VIDEO = {
  fleet: asset("/__l5e/assets-v1/4808ca81-75c8-47c5-99b0-aac22714b770/fleet-loop.mp4"),
  school: asset("/__l5e/assets-v1/9491f392-003d-4fe8-9e6a-e0617ca04656/school-loop.mp4"),
  audit: asset("/__l5e/assets-v1/88a38eb4-848f-4693-b510-99ad089e48bd/audit-loop.mp4"),
  dashcam: asset("/__l5e/assets-v1/04618362-7c41-4504-9fbd-1f84caf471d2/dashcam-loop.mp4"),
} as const;

export const mp4 = (src: string) => [{ src, type: "video/mp4" }];
