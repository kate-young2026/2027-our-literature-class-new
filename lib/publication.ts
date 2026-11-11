export type RevisionRow = { id:number; lessonId:number; status:string; content:string; createdAt:string };
export type PublicRevision = RevisionRow | { lessonId:number; status:'hidden' };
/** Input may be unsorted or contain private rows: select only the newest public-state event. */
export function selectPublicRevisions(rows:RevisionRow[]):PublicRevision[]{
 const latest=new Map<number,RevisionRow>();
 for(const row of rows){if(row.status!=='published' && row.status!=='hidden')continue;const previous=latest.get(row.lessonId);if(!previous||row.id>previous.id)latest.set(row.lessonId,row)}
 return [...latest.values()].map(row=>row.status==='hidden'?{lessonId:row.lessonId,status:'hidden'}:row);
}
