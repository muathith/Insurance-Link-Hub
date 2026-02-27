import { z } from "zod";
import { insertProfileSchema, insertLinkSchema, profile, links } from "./schema";

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  profile: {
    get: {
      method: "GET" as const,
      path: "/api/profile" as const,
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: "PUT" as const,
      path: "/api/profile" as const,
      input: insertProfileSchema.partial(),
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  links: {
    list: {
      method: "GET" as const,
      path: "/api/links" as const,
      responses: {
        200: z.array(z.custom<typeof links.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/links" as const,
      input: insertLinkSchema,
      responses: {
        201: z.custom<typeof links.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: "PUT" as const,
      path: "/api/links/:id" as const,
      input: insertLinkSchema.partial(),
      responses: {
        200: z.custom<typeof links.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/links/:id" as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
