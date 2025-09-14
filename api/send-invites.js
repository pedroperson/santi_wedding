import { Resend } from "resend";
import { redis } from "./_redis.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(_req, res) {
  const emails = await redis.smembers("guest:all");

  // Send emails to all guests
  for (const email of emails) {
    const guest = await redis.hgetall(`guest:${email}`);
    await resend.emails.send({
      from: "wedding@yourdomain.com", // Replace with your verified domain
      to: email,
      subject: "You're invited to our wedding! 💌",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B4513; text-align: center;">You're Invited!</h1>
          <p style="font-size: 18px; text-align: center;">Hi ${
            guest?.name || "friend"
          }!</p>
          <p style="font-size: 16px; line-height: 1.6;">
            We can't wait to celebrate our special day with you! 
            ${
              guest?.pluses > 0
                ? `You have ${guest.pluses} plus${
                    guest.pluses > 1 ? "es" : ""
                  } for the celebration.`
                : ""
            }
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Please visit our wedding website for more details and to RSVP.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://your-wedding-site.vercel.app" 
               style="background-color: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Visit Our Wedding Site
            </a>
          </div>
          <p style="text-align: center; color: #666; font-size: 14px;">
            With love,<br>
            Santi & Partner
          </p>
        </div>
      `,
    });
  }

  res.status(200).send(`Sent invites to ${emails.length} guest(s)`);
}
