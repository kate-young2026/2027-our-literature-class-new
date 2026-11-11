import { desc, eq } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db';
import { revisions } from '../../../db/schema';
import { isAdmin } from '../../admin-auth';
export const dynamic='force-dynamic';
export async function GET(){
 if(!(await isAdmin()))return Response.json({error:'권한이 없습니다.'},{status:403});
 const rows=await getDb().select().from(revisions).where(eq(revisions.status,'teacher')).orderBy(desc(revisions.id));
 const guides:Record<number,string>={};
 const source=env.TEACHER_GUIDE||'';
 for(const match of source.matchAll(/^## (\d+)\. [^\r\n]+\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm))guides[Number(match[1])]=match[2].trim();
 const seen=new Set<number>();for(const row of rows)if(!seen.has(row.lessonId)){guides[row.lessonId]=row.content;seen.add(row.lessonId)}
 const commonAt=source.indexOf('## 공통 평가 기준');
 const commonGuide=commonAt<0?'':source.slice(commonAt).trim();
 return Response.json({guides,commonGuide},{headers:{'Cache-Control':'no-store'}});
}
export async function POST(request:Request){
 if(!(await isAdmin()))return Response.json({error:'권한이 없습니다.'},{status:403});
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'요청 출처가 올바르지 않습니다.'},{status:403});
 let data: any;try{data=await request.json()}catch{return Response.json({error:'잘못된 요청입니다.'},{status:400})}
 if(!data||!Number.isInteger(data.lessonId)||data.lessonId<1||data.lessonId>14||typeof data.guide!=='string'||data.guide.length>20000)return Response.json({error:'자료 형식이 올바르지 않습니다.'},{status:400});
 await getDb().insert(revisions).values({lessonId:data.lessonId,content:data.guide,status:'teacher',createdAt:new Date().toISOString()});
 return Response.json({saved:true});
}

