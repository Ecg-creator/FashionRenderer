import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import fileUpload from "express-fileupload";

// Create upload directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup file upload middleware
  app.use(fileUpload({
    createParentPath: true,
    limits: { 
      fileSize: 50 * 1024 * 1024 // 50MB max file size
    },
  }));
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

  // Endpoint for pattern file uploads
  app.post("/api/patterns/upload", (req: Request, res: Response) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }

      const file = req.files.patternFile as fileUpload.UploadedFile;
      
      // Validate file is a zip
      if (!file.name.endsWith('.zip')) {
        return res.status(400).json({ message: 'Please upload a zip file' });
      }

      // Create a unique filename
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${file.name}`;
      
      // Move the file to the upload directory
      const uploadPath = path.join(uploadDir, fileName);
      file.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error uploading file', error: err });
        }
        
        // Return success response with file info
        res.json({
          message: 'File uploaded successfully',
          fileName: fileName,
          originalName: file.name,
          size: file.size,
          path: `/uploads/${fileName}`
        });
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });

  // Endpoint to list uploaded pattern files
  app.get("/api/patterns/files", (_req: Request, res: Response) => {
    try {
      fs.readdir(uploadDir, (err, files) => {
        if (err) {
          return res.status(500).json({ message: 'Error reading files', error: err });
        }
        
        // Only return zip files
        const zipFiles = files.filter(file => file.endsWith('.zip'));
        
        // Map files to include more info
        const fileList = zipFiles.map(file => {
          const stats = fs.statSync(path.join(uploadDir, file));
          const originalName = file.substring(file.indexOf('-') + 1);
          
          // Extract pattern type from filename
          let patternType = "unknown";
          if (originalName.toLowerCase().includes("shirt")) patternType = "shirt";
          else if (originalName.toLowerCase().includes("pant") || originalName.toLowerCase().includes("trouser")) patternType = "pants";
          else if (originalName.toLowerCase().includes("jacket") || originalName.toLowerCase().includes("biker")) patternType = "jacket";
          else if (originalName.toLowerCase().includes("dress")) patternType = "dress";
          
          return {
            name: file,
            originalName: originalName,
            size: stats.size,
            createdAt: stats.birthtime,
            path: `/uploads/${file}`,
            type: patternType
          };
        });
        
        res.json({ files: fileList });
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });

  // Serve uploaded files
  app.use('/uploads', (req: Request, res: Response, next) => {
    // Only allow access to zip files for security
    if (!req.path.endsWith('.zip')) {
      return res.status(403).send('Forbidden');
    }
    next();
  }, express.static(uploadDir));

  const httpServer = createServer(app);

  return httpServer;
}
