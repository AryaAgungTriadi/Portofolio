import { identity } from "@/lib/guestbook-auth";
import { body, database, databaseReady, failure, field, limit, SubmissionError } from "@/lib/submissions";

export async function GET() {
  if (!databaseReady()) return Response.json({ ready: false, entries: [] }, { headers: { "Cache-Control": "no-store" } });
  try {
    const response = await database("guestbook_entries?select=id,name,message,parent_id,created_at,avatar_url,provider,is_owner&approved=eq.true&order=created_at.desc&limit=100");
    return Response.json({ ready: true, entries: await response.json() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return failure(error); }
}
export async function POST(request: Request) {
  try {
    const values = await body(request);
    const user = await identity();
    if (!user) throw new SubmissionError(401);
    const name = user.name;
    const message = field(values.message, 2, 1000);
    if (values.website) throw new SubmissionError(400);
    let parentId: string | null = null;
    if (values.parentId) {
      parentId = field(values.parentId, 36, 36);
      if (!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(parentId)) throw new SubmissionError(400);
      const response = await database(`guestbook_entries?select=id&id=eq.${parentId}&approved=eq.true&limit=1`);
      if (!(await response.json()).length) throw new SubmissionError(400);
    }
    await limit(request, "guestbook");
    await database("guestbook_entries", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ name, message, parent_id: parentId, approved: true, user_id: user.id, avatar_url: user.avatar_url, provider: user.provider, is_owner: user.is_owner }) });
    return Response.json({ sent: true }, { status: 201 });
  } catch (error) { return failure(error); }
}
