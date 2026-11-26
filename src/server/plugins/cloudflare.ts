import { definePlugin } from "nitro";

export default definePlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event: any) => {
    try {
      const cfEnv =
        event?.req?.runtime?.cloudflare?.env ||
        event?.runtime?.cloudflare?.env ||
        event?.context?.cloudflare?.env ||
        event?.req?.cf;
      if (cfEnv) {
        (globalThis as any).__CF_ENV__ = cfEnv;
        (globalThis as any).__env__ = cfEnv;
        if (cfEnv.LEADS_KV) {
          (globalThis as any).LEADS_KV = cfEnv.LEADS_KV;
        }
      }
    } catch {}
  });
});
