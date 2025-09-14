import { redis } from "./_redis.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, pluses = 0 } = req.body || {};
  if (!email) return res.status(400).send("email required");

  await redis.hset(`guest:${email}`, {
    name,
    email,
    pluses: Number(pluses) || 0,
  });
  await redis.sadd("guest:all", email);

  res.status(200).end("ok");
}
