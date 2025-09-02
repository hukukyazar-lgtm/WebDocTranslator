import {
  users,
  gameStats,
  gameSessions,
  type User,
  type UpsertUser,
  type GameStats,
  type InsertGameStats,
  type GameSession,
  type InsertGameSession,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Game statistics operations
  getUserStats(userId: string): Promise<GameStats | undefined>;
  createUserStats(userId: string): Promise<GameStats>;
  updateUserStats(userId: string, updates: Partial<InsertGameStats>): Promise<GameStats>;
  
  // Game session operations
  createGameSession(session: InsertGameSession): Promise<GameSession>;
  getUserGameSessions(userId: string, limit?: number): Promise<GameSession[]>;
  
  // Combined stats calculation
  calculateUserStats(userId: string): Promise<{
    gamesPlayed: number;
    successRate: number;
    bestStreak: number;
    totalScore: number;
    averageGuessTime: number;
  }>;

  // Category progress
  getCategoryProgress(userId: string): Promise<{
    categories: { [category: string]: number };
    lastGame?: { category: string; word: string; date: string };
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Game statistics operations
  async getUserStats(userId: string): Promise<GameStats | undefined> {
    const [stats] = await db.select().from(gameStats).where(eq(gameStats.userId, userId));
    return stats;
  }

  async createUserStats(userId: string): Promise<GameStats> {
    const [stats] = await db
      .insert(gameStats)
      .values({ userId })
      .returning();
    return stats;
  }

  async updateUserStats(userId: string, updates: Partial<InsertGameStats>): Promise<GameStats> {
    const [stats] = await db
      .update(gameStats)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(gameStats.userId, userId))
      .returning();
    return stats;
  }

  // Game session operations
  async createGameSession(session: InsertGameSession): Promise<GameSession> {
    const [gameSession] = await db
      .insert(gameSessions)
      .values(session)
      .returning();
    return gameSession;
  }

  async getUserGameSessions(userId: string, limit: number = 50): Promise<GameSession[]> {
    return await db
      .select()
      .from(gameSessions)
      .where(eq(gameSessions.userId, userId))
      .orderBy(desc(gameSessions.createdAt))
      .limit(limit);
  }

  // Combined stats calculation
  async calculateUserStats(userId: string): Promise<{
    gamesPlayed: number;
    successRate: number;
    bestStreak: number;
    totalScore: number;
    averageGuessTime: number;
  }> {
    // Get overall stats from gameStats table
    const [stats] = await db.select().from(gameStats).where(eq(gameStats.userId, userId));
    
    if (!stats) {
      return {
        gamesPlayed: 0,
        successRate: 0,
        bestStreak: 0,
        totalScore: 0,
        averageGuessTime: 0,
      };
    }

    // Calculate success rate
    const totalGames = stats.totalGamesPlayed || 0;
    const correctGuesses = stats.totalCorrectGuesses || 0;
    const totalTime = stats.totalGuessTime || 0;
    
    const successRate = totalGames > 0 
      ? Math.round((correctGuesses / totalGames) * 100)
      : 0;

    // Calculate average guess time
    const averageGuessTime = totalGames > 0 
      ? Math.round(totalTime / totalGames * 100) / 100
      : 0;

    return {
      gamesPlayed: stats.totalGamesPlayed || 0,
      successRate,
      bestStreak: stats.bestStreak || 0,
      totalScore: stats.totalScore || 0,
      averageGuessTime,
    };
  }

  async getCategoryProgress(userId: string): Promise<{
    categories: { [category: string]: number },
    lastGame?: { category: string, word: string, date: string }
  }> {
    // Get category counts
    const sessions = await db
      .select({
        category: gameSessions.category,
        count: sql<number>`count(*)`,
      })
      .from(gameSessions)
      .where(eq(gameSessions.userId, userId))
      .groupBy(gameSessions.category);

    const categories: { [category: string]: number } = {};
    for (const session of sessions) {
      categories[session.category] = Number(session.count);
    }

    // Get last game
    const [lastGame] = await db
      .select({
        category: gameSessions.category,
        word: gameSessions.word,
        createdAt: gameSessions.createdAt,
      })
      .from(gameSessions)
      .where(eq(gameSessions.userId, userId))
      .orderBy(desc(gameSessions.createdAt))
      .limit(1);

    return {
      categories,
      lastGame: lastGame ? {
        category: lastGame.category,
        word: lastGame.word,
        date: lastGame.createdAt?.toISOString() || ''
      } : undefined
    };
  }
}

export const storage = new DatabaseStorage();