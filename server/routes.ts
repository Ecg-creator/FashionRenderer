import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/garments", (_req, res) => {
    // In a real app, this would fetch from DB
    // For now, we'll serve the garment data from a static file
    try {
      const garmentData = [
        {
          id: "t-001",
          name: "Classic T-Shirt",
          type: "tshirt",
          description: "A versatile classic t-shirt with a relaxed fit and crew neck.",
          material: {
            composition: "100% Cotton",
            weight: 180,
            stretch: "Low Stretch"
          },
          measurements: {
            size: "M",
            chest: 52,
            waist: 50,
            hip: 52,
            length: 70,
            shoulder: 45,
            sleeve: 22
          }
        },
        {
          id: "d-001",
          name: "Summer Dress",
          type: "dress",
          description: "A light and airy summer dress with a flared silhouette.",
          material: {
            composition: "95% Cotton, 5% Elastane",
            weight: 150,
            stretch: "Medium Stretch"
          },
          measurements: {
            size: "S",
            chest: 46,
            waist: 38,
            hip: 48,
            length: 90,
            shoulder: 38,
            sleeve: 0
          }
        },
        {
          id: "j-001",
          name: "Tailored Jacket",
          type: "jacket",
          description: "A structured tailored jacket with a modern fit.",
          material: {
            composition: "80% Wool, 20% Polyester",
            weight: 300,
            stretch: "Low Stretch"
          },
          measurements: {
            size: "L",
            chest: 56,
            waist: 52,
            hip: 54,
            length: 75,
            shoulder: 48,
            sleeve: 64
          }
        }
      ];
      
      res.json(garmentData);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve garment data" });
    }
  });

  app.get("/api/garments/:id", (req, res) => {
    // Get specific garment by ID
    const garmentId = req.params.id;
    
    // In a real app, this would fetch from DB
    // For now, we'll return a mock response
    try {
      const garments = [
        {
          id: "t-001",
          name: "Classic T-Shirt",
          type: "tshirt"
        },
        {
          id: "d-001",
          name: "Summer Dress",
          type: "dress"
        },
        {
          id: "j-001",
          name: "Tailored Jacket",
          type: "jacket"
        }
      ];
      
      const garment = garments.find(g => g.id === garmentId);
      
      if (garment) {
        res.json(garment);
      } else {
        res.status(404).json({ error: "Garment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve garment data" });
    }
  });

  app.get("/api/models/:type", (req, res) => {
    // Serve 3D model data for garments
    const modelType = req.params.type;
    const validTypes = ["tshirt", "dress", "jacket"];
    
    if (!validTypes.includes(modelType)) {
      return res.status(404).json({ error: "Model not found" });
    }
    
    try {
      const modelPath = path.join(process.cwd(), "client", "public", "models", `${modelType}.json`);
      
      if (fs.existsSync(modelPath)) {
        const modelData = fs.readFileSync(modelPath, "utf-8");
        res.json(JSON.parse(modelData));
      } else {
        res.status(404).json({ error: "Model file not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve model data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
