import "dotenv/config";
import http from "http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(version);
  } catch (err) {
    res.writeHead(500);
    res.end("DB not ready: " + err.message);
  }
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
