import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertGameSessionSchema } from "@shared/schema";

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

  // Game statistics routes
  app.get('/api/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userStats = await storage.calculateUserStats(userId);
      res.json(userStats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  app.post('/api/game-session', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessionData = insertGameSessionSchema.parse({
        ...req.body,
        userId
      });

      // Create game session
      const gameSession = await storage.createGameSession(sessionData);

      // Get or create user stats
      let userStats = await storage.getUserStats(userId);
      if (!userStats) {
        userStats = await storage.createUserStats(userId);
      }

      // Update user stats
      const newTotalGames = (userStats.totalGamesPlayed || 0) + 1;
      const newCorrectGuesses = (userStats.totalCorrectGuesses || 0) + (sessionData.isCorrect ? 1 : 0);
      const newTotalScore = (userStats.totalScore || 0) + sessionData.score;
      const newTotalTime = (userStats.totalGuessTime || 0) + sessionData.guessTime;

      // Calculate new streak
      let newCurrentStreak = userStats.currentStreak || 0;
      if (sessionData.isCorrect) {
        newCurrentStreak++;
      } else {
        newCurrentStreak = 0;
      }

      const newBestStreak = Math.max(userStats.bestStreak || 0, newCurrentStreak);

      // Update stats
      await storage.updateUserStats(userId, {
        totalGamesPlayed: newTotalGames,
        totalCorrectGuesses: newCorrectGuesses,
        totalScore: newTotalScore,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        totalGuessTime: newTotalTime,
      });

      // Return updated stats
      const updatedStats = await storage.calculateUserStats(userId);
      res.json({ gameSession, stats: updatedStats });
    } catch (error) {
      console.error("Error saving game session:", error);
      res.status(500).json({ message: "Failed to save game session" });
    }
  });

  app.get('/api/game-sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = parseInt(req.query.limit as string) || 50;
      const sessions = await storage.getUserGameSessions(userId, limit);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching game sessions:", error);
      res.status(500).json({ message: "Failed to fetch game sessions" });
    }
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