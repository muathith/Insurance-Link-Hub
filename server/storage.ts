import { db } from "./db";
import { profile, links, type Profile, type InsertProfile, type Link, type InsertLink, type UpdateProfileRequest, type UpdateLinkRequest } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  updateProfile(updates: UpdateProfileRequest): Promise<Profile>;
  getLinks(): Promise<Link[]>;
  createLink(link: InsertLink): Promise<Link>;
  updateLink(id: number, updates: UpdateLinkRequest): Promise<Link>;
  deleteLink(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const profiles = await db.select().from(profile);
    return profiles[0];
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<Profile> {
    const existing = await this.getProfile();
    if (!existing) {
      const [newProfile] = await db.insert(profile).values({
        name: updates.name || "تأمين السيارات",
        bio: updates.bio || "أفضل عروض تأمين السيارات",
        ...updates
      }).returning();
      return newProfile;
    }
    
    const [updated] = await db.update(profile)
      .set(updates)
      .where(eq(profile.id, existing.id))
      .returning();
    return updated;
  }

  async getLinks(): Promise<Link[]> {
    return await db.select().from(links).orderBy(links.order);
  }

  async createLink(link: InsertLink): Promise<Link> {
    const [newLink] = await db.insert(links).values(link).returning();
    return newLink;
  }

  async updateLink(id: number, updates: UpdateLinkRequest): Promise<Link> {
    const [updated] = await db.update(links)
      .set(updates)
      .where(eq(links.id, id))
      .returning();
    return updated;
  }

  async deleteLink(id: number): Promise<void> {
    await db.delete(links).where(eq(links.id, id));
  }
}

export const storage = new DatabaseStorage();
