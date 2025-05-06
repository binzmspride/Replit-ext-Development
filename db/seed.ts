import { db } from "./index";
import * as schema from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seed() {
  try {
    console.log("Starting seed process...");
    
    // Check if we already have users
    const existingUsers = await db.query.users.findMany();
    
    if (existingUsers.length === 0) {
      console.log("Seeding users...");
      
      // Create a demo user
      const demoUser = {
        username: "demo",
        password: await hashPassword("password"),
      };
      
      const [user] = await db.insert(schema.users)
        .values(demoUser)
        .returning();
      
      console.log(`Created demo user with id: ${user.id}`);
      
      // Seed some sample hearts for the demo user
      console.log("Seeding hearts...");
      
      const sampleHearts = [
        {
          userId: user.id,
          name: "Simple Red Heart",
          image: "data:image/png;base64,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",
          createdAt: new Date(),
        },
        {
          userId: user.id,
          name: "Gradient Heart",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAADelJREFUeF7tnXmQHMV9x3/dszO7s6tdaVdCF+gQEhKIQ4BAgARYXLaxsUMgYAiBJH+Qw1Vi5zhVduyrylWpVMrJn0mKxCmTciCGGJvE2AZMDGYcwCZgSWCDBAIJxCF0a7VarfbcnZ78erazFrvTM/369fT096taamd6ut/7/d7v8+t5r1+/VmiSKTAMzD0CxrSETOJi9QJJoGFYXZRNSdskZNIpHZPE6w6Gp2NSNiaxOieB5+tZlM1J3NBH0ymdzODZlpQz+Trfzje5OicB5+ujbErcZvCMTco7+X7+yTfJnK/Pskm8niRtTsOkMkh9lE3SvpN/8k/Sk3izkzQdKIN0sKPzQVBg0iFAEKDLwDAMHnQcJGOkgDLbxUENQXUJVL5LHGAkxlgILsJgcTNOPUVgrCUcTM6DalIQIGTKgU7iAgMZBzqhgBEOJIZlMBw9Tc20AVAJk0a1QMNQZNoYQ5jUpFBAmrBbDH+HQ7IA0kU6jnUdBMNwoCYRg6YC6o0h3WGoyWBSF6Uv6o/6r/6r/+sM6CQDZ4UKiDUwuoD+kYgfnzlPWfTXbQ/vUL9EAVGwTAGLygZhiRvq/6qvTqwMFBjqv+qHFQYDbWFSYKj/qv/Wf9ePcQAk3DK4gCiYNELIDH+HQ6IAWaJWAWTaVINliqrJnF1YgwVEBpdloIV1jTAhGHH3gzWA3WDZ/mwBQKBXQMMMFmgwTICkgH4HRvUQWCAAMVgAsRggcQOIwGKw4CIdR8DRZIXCYIDEDSDBSQaLdQZIMjAEKPVDHaOyKVlbLBjWGMUPx01YEwCGABWp/xcUDNYYjB8OCxY/HT9hmYYR4vFx5jCr/zgCEAwMALkh4JoK0LUAnPoAcAb/TtTBQZxkxOB4Yx9ceQJEZTBYgbJ8MQRdPZwx1hisfnqPV/y2UE5YI4eawIhtOMwajw82Io8bhiXI1kUVRgRPTwf8xyrgqnl2vVkbEmqKuAGLH87lkPip/9YggdW/k4FhBQPYYPDcmQ74u/WgBP/nJoApmXi0KImzxrjjc2TXdDnfT4eBDQjf1oZjnYIZdxs/KCKvxkTW1mCL8ewe4MmDwM3zgHnZM6AErjlHDNa44YvJtf1wnmNniyNrDGYRHtCcOmbXcWON8Sek58rg4Fng8KtVYOEUYHbX0HE0SRf0/NZgse7XjRPW6TPB1vPSVV7gzFqDJWuMIU28cC1w/VzgimlAf7N5jJg1JhQcYemIv03CMDD4LtJxEAwWGM3+b2vg+CATJPGawQokF6DPL9YMKG93B3DzfGDeJHe9GFCDxZrBrB8UEGuwoMECjO0g1wYbCkjcsBgC5ZTCYfupgOd2Ax92ATfMtYHDfq1bY9zGwXqPCTRXGw4DZrCoL9TsgZKUwWrQnVLgqIHxZgG47wNgxgRbPqdfE+bjxhqDcQYDG3y/gqHbYvHR9rQC44UCuP+joaVTa7DrLdTnmvGayKA0pggMCyAaM73GDXAoMIrge3uAY+XhdY2gyGzFGJZQfGnzQTrY0Pk6KTxaEGQkMNT/1X/Vf9UPK9Qn7TjIwEhRQMINFn/BMFjUzxpnXK+D/B9UQdEgG3HWYAAAAABJRU5ErkJggg==",
          createdAt: new Date(),
        }
      ];
      
      await db.insert(schema.hearts).values(sampleHearts);
      
      console.log("Added sample hearts");
    } else {
      console.log("Users already exist, skipping seed");
    }
    
    console.log("Seed completed successfully!");
    
  } catch (error) {
    console.error("Error during seed:", error);
  }
}

seed();
