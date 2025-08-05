"use server";

import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST(req) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Get the event type
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;
    
    try {
      // First check if user already exists
      const existingUser = await db.user.findUnique({
        where: { clerkUserId: id },
      });

      if (existingUser) {
        return new Response(JSON.stringify({ success: true, user: existingUser }), {
          status: 200,
        });
      }

      // Create new user if they don't exist
      const user = await db.user.create({
        data: {
          clerkUserId: id,
          email: email_addresses[0]?.email_address || '',
          name: `${first_name || ''} ${last_name || ''}`.trim() || 'New User',
          imageUrl: image_url,
        },
      });
      
      return new Response(JSON.stringify({ success: true, user }), {
        status: 200,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
      });
    }

    // Create a new user in your database
    try {
      await db.user.create({
        data: {
          clerkUserId: id,
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
          imageUrl: image_url,
        },
      });

      return new Response("User created", { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error occurred", { status: 400 });
    }
  }

  return new Response("", { status: 201 });
}
