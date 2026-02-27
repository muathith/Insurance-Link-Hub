import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.updateProfile({
      name: "أفضل تأمين لسيارتك",
      bio: "وفّرنا عليك البحث بين أكثر من ٢٠ شركة تأمين في مكان واحد",
      privacyPolicy: "سياسة الخصوصية الخاصة بنا (تتضمن قواعد NZCD): نحن نحمي بياناتك ونلتزم بجميع قواعد الخصوصية. يتم استخدام بياناتك فقط لغرض تقديم عروض التأمين المناسبة لك.",
      cookiePolicy: "سياسة ملفات تعريف الارتباط: نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتقديم محتوى مخصص لك.",
    });
  }

  const existingLinks = await storage.getLinks();
  if (existingLinks.length === 0) {
    await storage.createLink({
      title: "احصل على عرض سعر",
      url: "https://example.com/quote",
      order: 1,
      isActive: true,
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    });
    await storage.createLink({
      title: "اتصل بنا",
      url: "https://example.com/contact",
      order: 2,
      isActive: true,
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    });
    await storage.createLink({
      title: "عروض مميزة",
      url: "https://example.com/offers",
      order: 3,
      isActive: true,
      imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed initial data
  await seedDatabase();

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.put(api.profile.update.path, async (req, res) => {
    try {
      const input = api.profile.update.input.parse(req.body);
      const updated = await storage.updateProfile(input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.links.list.path, async (req, res) => {
    const links = await storage.getLinks();
    res.json(links);
  });

  app.post(api.links.create.path, async (req, res) => {
    try {
      const input = api.links.create.input.parse(req.body);
      const link = await storage.createLink(input);
      res.status(201).json(link);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.links.update.path, async (req, res) => {
    try {
      const id = z.coerce.number().parse(req.params.id);
      const input = api.links.update.input.parse(req.body);
      const link = await storage.updateLink(id, input);
      res.json(link);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      return res.status(404).json({ message: "Not found" });
    }
  });

  app.delete(api.links.delete.path, async (req, res) => {
    try {
      const id = z.coerce.number().parse(req.params.id);
      await storage.deleteLink(id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ message: "Not found" });
    }
  });

  return httpServer;
}
