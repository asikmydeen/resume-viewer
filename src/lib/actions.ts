"use server";

import { db } from "@/db";
import { users, resumes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Resume } from "./resume-schema";

export async function claimUsername(username: string) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return { error: "Unauthorized" };
  }

  // simple regex for subdomain validity
  const validUsername = /^[a-z0-9-]+$/.test(username);
  if (!validUsername) {
    return { error: "Invalid username. Use lowercase letters, numbers, and hyphens only." };
  }

  try {
    // Check availability
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existing) {
      return { error: "Username already taken" };
    }

    // Create user record
    await db.insert(users).values({
      id: userId,
      email: user.emailAddresses[0].emailAddress,
      username: username,
    });

    return { success: true, username };
  } catch (e) {
    console.error(e);
    return { error: "Failed to claim username" };
  }
}

export async function saveResume(data: Resume) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    // Upsert resume
    await db
      .insert(resumes)
      .values({
        userId: userId,
        data: data as any, // Casting jsonb
      })
      .onConflictDoUpdate({
        target: resumes.userId,
        set: {
          data: data as any,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to save resume" };
  }
}

export async function getUserResume() {
  const { userId } = await auth();
  if (!userId) return null;

  const result = await db.query.resumes.findFirst({
    where: eq(resumes.userId, userId),
  });

  return result ? (result.data as unknown as Resume) : null;
}

export async function getUsername() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user ? user.username : null;
}

// Public fetch for the subdomain view
export async function getResumeByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) return null;

  const resume = await db.query.resumes.findFirst({
    where: eq(resumes.userId, user.id),
  });

  return resume ? (resume.data as unknown as Resume) : null;
}