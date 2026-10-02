import { body, databaseReady, failure, field, limit, SubmissionError } from "@/lib/submissions";

function ready() { return databaseReady() && Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL); }
export async function GET() { return Response.json({ ready: ready() }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST(request: Request) {
  try {
    const values = await body(request);
    if (!ready()) throw new SubmissionError(503);
    const name = field(values.name, 2, 80);
    const email = field(values.email, 3, 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(name + email)) throw new SubmissionError(400);
    const subject = field(values.subject, 1, 30);
    const subjects: Record<string, string> = { collaboration: "Kolaborasi Proyek", opportunity: "Peluang Kerja", question: "Pertanyaan Umum" };
    if (!Object.hasOwn(subjects, subject)) throw new SubmissionError(400);
    const message = field(values.message, 10, 4000);
    if (values.website) throw new SubmissionError(400);
    await limit(request, "contact");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10000),
      headers: { "Authorization": `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: email, subject: `[Portfolio] ${subjects[subject]}`, text: `Nama: ${name}\nEmail: ${email}\n\n${message}` }),
    });
    if (!response.ok) throw new SubmissionError(503);
    return Response.json({ sent: true });
  } catch (error) { return failure(error); }
}
