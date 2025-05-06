import { db } from "@db";
import { users, hearts, InsertUser, User, Heart, InsertHeart } from "@shared/schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getHearts(userId: number): Promise<Heart[]>;
  getHeart(id: number): Promise<Heart | undefined>;
  createHeart(heart: InsertHeart): Promise<Heart>;
  updateHeart(id: number, heart: Partial<InsertHeart>): Promise<Heart | undefined>;
  deleteHeart(id: number): Promise<boolean>;
  
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id)
    });
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.query.users.findFirst({
      where: eq(users.username, username)
    });
    return result;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [result] = await db.insert(users).values(user).returning();
    return result;
  }

  async getHearts(userId: number): Promise<Heart[]> {
    const result = await db.query.hearts.findMany({
      where: eq(hearts.userId, userId)
    });
    return result;
  }

  async getHeart(id: number): Promise<Heart | undefined> {
    const result = await db.query.hearts.findFirst({
      where: eq(hearts.id, id)
    });
    return result;
  }

  async createHeart(heart: InsertHeart): Promise<Heart> {
    const [result] = await db.insert(hearts).values(heart).returning();
    return result;
  }

  async updateHeart(id: number, heart: Partial<InsertHeart>): Promise<Heart | undefined> {
    const [result] = await db
      .update(hearts)
      .set(heart)
      .where(eq(hearts.id, id))
      .returning();
    return result;
  }

  async deleteHeart(id: number): Promise<boolean> {
    const result = await db.delete(hearts).where(eq(hearts.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
