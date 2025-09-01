import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Protected route example
  app.get("/api/protected", isAuthenticated, async (req, res) => {
    const userId = (req.user as any)?.claims?.sub;
    // Do something with the user id.
    res.json({ message: "This is a protected route", userId });
  });

  // Google OAuth routes (ready for activation)
  app.get('/api/auth/google', async (req, res) => {
    // TODO: Implement Google OAuth when credentials are provided
    res.status(501).json({ 
      message: 'Google login will be activated when credentials are configured',
      status: 'pending_setup'
    });
  });

  app.get('/api/auth/google/callback', async (req, res) => {
    // TODO: Handle Google OAuth callback
    res.status(501).json({ 
      message: 'Google OAuth callback not yet configured',
      status: 'pending_setup'
    });
  });

  // Facebook OAuth routes (ready for activation)
  app.get('/api/auth/facebook', async (req, res) => {
    // TODO: Implement Facebook OAuth when credentials are provided
    res.status(501).json({ 
      message: 'Facebook login will be activated when credentials are configured',
      status: 'pending_setup'
    });
  });

  app.get('/api/auth/facebook/callback', async (req, res) => {
    // TODO: Handle Facebook OAuth callback
    res.status(501).json({ 
      message: 'Facebook OAuth callback not yet configured',
      status: 'pending_setup'
    });
  });

  // More routes can be added here
  const httpServer = createServer(app);
  return httpServer;
}