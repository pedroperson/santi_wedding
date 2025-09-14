import { redis } from "./_redis.js";

export default async function handler(_req, res) {
  const emails = await redis.smembers("guest:all");
  const guests = await Promise.all(
    emails.map((e) => redis.hgetall(`guest:${e}`))
  );

  res.json(guests.filter(Boolean));
}
