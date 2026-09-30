import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Development middleware plugin to handle /api/contact during `npm run dev`
function devContactApiPlugin(): Plugin {
  return {
    name: "dev-contact-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/contact" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const data = JSON.parse(body || "{}");
              console.log("\n[Dev Contact API] Received inquiry:");
              console.log(data);

              // Validate fields
              if (!data.name || !data.email || !data.message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Missing required fields in inquiry." }));
                return;
              }

              // Return success response
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true, dev: true }));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to parse JSON body" }));
            }

          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), devContactApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
