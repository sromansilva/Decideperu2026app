import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============================================
// HEALTH CHECK
// ============================================
app.get("/make-server-c94da9a3/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// CANDIDATES MANAGEMENT
// ============================================

// Get all candidates
app.get("/make-server-c94da9a3/candidates", async (c) => {
  try {
    const candidates = await kv.getByPrefix("candidate:");
    return c.json({ success: true, data: candidates });
  } catch (error) {
    console.log("Error fetching candidates:", error);
    return c.json({ success: false, error: "Failed to fetch candidates" }, 500);
  }
});

// Get single candidate by ID
app.get("/make-server-c94da9a3/candidates/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const candidate = await kv.get(`candidate:${id}`);
    
    if (!candidate) {
      return c.json({ success: false, error: "Candidate not found" }, 404);
    }
    
    return c.json({ success: true, data: candidate });
  } catch (error) {
    console.log("Error fetching candidate:", error);
    return c.json({ success: false, error: "Failed to fetch candidate" }, 500);
  }
});

// Create new candidate
app.post("/make-server-c94da9a3/candidates", async (c) => {
  try {
    const body = await c.req.json();
    const id = Date.now().toString();
    const candidate = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`candidate:${id}`, candidate);
    return c.json({ success: true, data: candidate }, 201);
  } catch (error) {
    console.log("Error creating candidate:", error);
    return c.json({ success: false, error: "Failed to create candidate" }, 500);
  }
});

// Update candidate
app.put("/make-server-c94da9a3/candidates/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`candidate:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "Candidate not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`candidate:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating candidate:", error);
    return c.json({ success: false, error: "Failed to update candidate" }, 500);
  }
});

// Delete candidate
app.delete("/make-server-c94da9a3/candidates/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`candidate:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "Candidate not found" }, 404);
    }
    
    await kv.del(`candidate:${id}`);
    return c.json({ success: true, message: "Candidate deleted" });
  } catch (error) {
    console.log("Error deleting candidate:", error);
    return c.json({ success: false, error: "Failed to delete candidate" }, 500);
  }
});

// ============================================
// NEWS MANAGEMENT
// ============================================

// Get all news
app.get("/make-server-c94da9a3/news", async (c) => {
  try {
    const news = await kv.getByPrefix("news:");
    return c.json({ success: true, data: news });
  } catch (error) {
    console.log("Error fetching news:", error);
    return c.json({ success: false, error: "Failed to fetch news" }, 500);
  }
});

// Get single news by ID
app.get("/make-server-c94da9a3/news/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const news = await kv.get(`news:${id}`);
    
    if (!news) {
      return c.json({ success: false, error: "News not found" }, 404);
    }
    
    return c.json({ success: true, data: news });
  } catch (error) {
    console.log("Error fetching news:", error);
    return c.json({ success: false, error: "Failed to fetch news" }, 500);
  }
});

// Create news
app.post("/make-server-c94da9a3/news", async (c) => {
  try {
    const body = await c.req.json();
    const id = Date.now().toString();
    const news = {
      id,
      ...body,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`news:${id}`, news);
    return c.json({ success: true, data: news }, 201);
  } catch (error) {
    console.log("Error creating news:", error);
    return c.json({ success: false, error: "Failed to create news" }, 500);
  }
});

// Update news
app.put("/make-server-c94da9a3/news/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`news:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "News not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`news:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating news:", error);
    return c.json({ success: false, error: "Failed to update news" }, 500);
  }
});

// Delete news
app.delete("/make-server-c94da9a3/news/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`news:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "News not found" }, 404);
    }
    
    await kv.del(`news:${id}`);
    return c.json({ success: true, message: "News deleted" });
  } catch (error) {
    console.log("Error deleting news:", error);
    return c.json({ success: false, error: "Failed to delete news" }, 500);
  }
});

// ============================================
// EVENTS MANAGEMENT
// ============================================

// Get all events
app.get("/make-server-c94da9a3/events", async (c) => {
  try {
    const events = await kv.getByPrefix("event:");
    return c.json({ success: true, data: events });
  } catch (error) {
    console.log("Error fetching events:", error);
    return c.json({ success: false, error: "Failed to fetch events" }, 500);
  }
});

// Get single event by ID
app.get("/make-server-c94da9a3/events/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const event = await kv.get(`event:${id}`);
    
    if (!event) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }
    
    return c.json({ success: true, data: event });
  } catch (error) {
    console.log("Error fetching event:", error);
    return c.json({ success: false, error: "Failed to fetch event" }, 500);
  }
});

// Create event
app.post("/make-server-c94da9a3/events", async (c) => {
  try {
    const body = await c.req.json();
    const id = Date.now().toString();
    const event = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`event:${id}`, event);
    return c.json({ success: true, data: event }, 201);
  } catch (error) {
    console.log("Error creating event:", error);
    return c.json({ success: false, error: "Failed to create event" }, 500);
  }
});

// Update event
app.put("/make-server-c94da9a3/events/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`event:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`event:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating event:", error);
    return c.json({ success: false, error: "Failed to update event" }, 500);
  }
});

// Delete event
app.delete("/make-server-c94da9a3/events/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`event:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }
    
    await kv.del(`event:${id}`);
    return c.json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.log("Error deleting event:", error);
    return c.json({ success: false, error: "Failed to delete event" }, 500);
  }
});

// ============================================
// NOTIFICATIONS MANAGEMENT
// ============================================

// Get all notifications
app.get("/make-server-c94da9a3/notifications", async (c) => {
  try {
    const notifications = await kv.getByPrefix("notification:");
    return c.json({ success: true, data: notifications });
  } catch (error) {
    console.log("Error fetching notifications:", error);
    return c.json({ success: false, error: "Failed to fetch notifications" }, 500);
  }
});

// Send notification
app.post("/make-server-c94da9a3/notifications/send", async (c) => {
  try {
    const body = await c.req.json();
    const id = Date.now().toString();
    const notification = {
      id,
      ...body,
      status: body.scheduled ? "scheduled" : "sent",
      sentAt: new Date().toISOString(),
    };
    
    await kv.set(`notification:${id}`, notification);
    return c.json({ success: true, data: notification }, 201);
  } catch (error) {
    console.log("Error sending notification:", error);
    return c.json({ success: false, error: "Failed to send notification" }, 500);
  }
});

// ============================================
// STATISTICS
// ============================================

// Get dashboard stats
app.get("/make-server-c94da9a3/stats/dashboard", async (c) => {
  try {
    const candidates = await kv.getByPrefix("candidate:");
    const news = await kv.getByPrefix("news:");
    const events = await kv.getByPrefix("event:");
    const notifications = await kv.getByPrefix("notification:");
    
    const stats = {
      totalCandidates: candidates.length,
      activeCandidates: candidates.filter((c: any) => c.status === "active").length,
      totalNews: news.length,
      publishedNews: news.filter((n: any) => n.status === "published").length,
      totalEvents: events.length,
      upcomingEvents: events.filter((e: any) => e.status === "upcoming").length,
      totalNotifications: notifications.length,
      sentNotifications: notifications.filter((n: any) => n.status === "sent").length,
    };
    
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.log("Error fetching stats:", error);
    return c.json({ success: false, error: "Failed to fetch stats" }, 500);
  }
});

// ============================================
// RENIEC CONSULTATION (Mock)
// ============================================

// Consult DNI
app.post("/make-server-c94da9a3/reniec/consult", async (c) => {
  try {
    const { dni } = await c.req.json();
    
    if (!dni || dni.length !== 8) {
      return c.json({ success: false, error: "Invalid DNI" }, 400);
    }
    
    // Check if already consulted
    const existingConsult = await kv.get(`reniec:${dni}`);
    if (existingConsult) {
      return c.json({ success: true, data: existingConsult, cached: true });
    }
    
    // In production, call real RENIEC API here
    // For now, return mock data
    const mockData = {
      dni,
      nombres: "CARLOS ALBERTO",
      apellidoPaterno: "MENDOZA",
      apellidoMaterno: "SILVA",
      fechaNacimiento: "10/03/1988",
      direccion: "AV. UNIVERSITARIA 890, LIMA",
      ubigeo: "150103",
      estadoCivil: "SOLTERO",
      consultedAt: new Date().toISOString(),
    };
    
    // Save consultation
    await kv.set(`reniec:${dni}`, mockData);
    
    return c.json({ success: true, data: mockData, cached: false });
  } catch (error) {
    console.log("Error consulting RENIEC:", error);
    return c.json({ success: false, error: "Failed to consult RENIEC" }, 500);
  }
});

// Get consultation history
app.get("/make-server-c94da9a3/reniec/history", async (c) => {
  try {
    const history = await kv.getByPrefix("reniec:");
    return c.json({ success: true, data: history });
  } catch (error) {
    console.log("Error fetching RENIEC history:", error);
    return c.json({ success: false, error: "Failed to fetch history" }, 500);
  }
});

Deno.serve(app.fetch);