import { desc,inArray,ne } from 'drizzle-orm';
import { getDb } from '../../../db';
import { revisions } from '../../../db/schema';
import { isAdmin } from '../../admin-auth';
import { lessons, learningNotes } from '../../curriculum';
import { selectPublicRevisions } from '../../../lib/publication';
export const dynamic = 'force-dynamic';
export async function GET(request:Request) {
 const admin = new URL(request.url).searchParams.get('admin') === '1';
 if(admin && !(await isAdmin())) return Response.json({error:'권한이 없습니다.'},{status:403});
 const db=getDb();
 const rows=admin ? await db.select().from(revisions).where(ne(revisions.status,'teacher')).orderBy(desc(revisions.id)).limit(200) : await db.select().from(revisions).where(inArray(revisions.status,['published','hidden'])).orderBy(desc(revisions.id));
 if(admin)return Response.json({revisions:rows},{headers:{'Cache-Control':'no-store'}});
 return Response.json({revisions:selectPublicRevisions(rows)},{headers:{'Cache-Control':'no-store'}});
}
export async function POST(request:Request) {
 if(!(await isAdmin()))return Response.json({error:'권한이 없습니다.'},{status:403});
 const origin=request.headers.get('origin'); if(!origin || origin!==new URL(request.url).origin)return Response.json({error:'요청 출처가 올바르지 않습니다.'},{status:403});
 let body: any; try{body=await request.json()}catch{return Response.json({error:'잘못된 요청입니다.'},{status:400})}
 if(!body||typeof body!=='object')return Response.json({error:'잘못된 요청입니다.'},{status:400});
 const {lessonId,content,status}=body;
 if(!Number.isInteger(lessonId)||!lessons.some(l=>l.id===lessonId)||!['draft','published','hidden'].includes(status)||!content||typeof content!=='object'||content.id!==lessonId||typeof content.title!=='string'||typeof content.goal!=='string'||typeof content.concept!=='string'||!Array.isArray(content.activity)||content.activity.length!==3||content.activity.some((v:unknown)=>typeof v!=='string')||typeof content.check!=='string'||typeof content.work!=='string'||JSON.stringify(content).length>30000)return Response.json({error:'자료 형식이 올바르지 않습니다.'},{status:400});
 const original=lessons.find(l=>l.id===lessonId)!; const note=content.learningNote; if(note && (typeof note.heading!=='string'||!Array.isArray(note.paragraphs)||note.paragraphs.length!==2||note.paragraphs.some((v:unknown)=>typeof v!=='string')||typeof note.tip!=='string'))return Response.json({error:'학습자료 형식이 올바르지 않습니다.'},{status:400}); const safe={id:lessonId,standard:original.standard,title:content.title,goal:content.goal,concept:content.concept,activity:content.activity,check:content.check,work:content.work,learningNote:note||learningNotes[lessonId]};
 const db=getDb(); const [row]=await db.insert(revisions).values({lessonId,content:JSON.stringify(safe),status,createdAt:new Date().toISOString()}).returning();
 return Response.json({revision:row},{status:201});
}






