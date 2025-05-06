import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { InsertHeart } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Heart drawing routes
  app.get("/api/hearts", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userHearts = await storage.getHearts(req.user.id);
      res.json(userHearts);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/hearts/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid heart ID" });
      }
      
      const heart = await storage.getHeart(id);
      
      if (!heart) {
        return res.status(404).json({ message: "Heart not found" });
      }
      
      if (heart.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(heart);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/hearts", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const heartSchema = z.object({
        image: z.string(),
        name: z.string().optional(),
      });
      
      const validationResult = heartSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid heart data", 
          errors: validationResult.error.errors 
        });
      }
      
      const { image, name } = validationResult.data;
      
      const newHeart: InsertHeart = {
        userId: req.user.id,
        image,
        name: name || `Heart ${new Date().toISOString()}`,
        createdAt: new Date(),
      };
      
      const heart = await storage.createHeart(newHeart);
      res.status(201).json(heart);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/hearts/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid heart ID" });
      }
      
      const heart = await storage.getHeart(id);
      
      if (!heart) {
        return res.status(404).json({ message: "Heart not found" });
      }
      
      if (heart.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updateSchema = z.object({
        name: z.string().optional(),
        image: z.string().optional(),
      });
      
      const validationResult = updateSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid update data", 
          errors: validationResult.error.errors 
        });
      }
      
      const updatedHeart = await storage.updateHeart(id, validationResult.data);
      res.json(updatedHeart);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/hearts/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid heart ID" });
      }
      
      const heart = await storage.getHeart(id);
      
      if (!heart) {
        return res.status(404).json({ message: "Heart not found" });
      }
      
      if (heart.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      await storage.deleteHeart(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
