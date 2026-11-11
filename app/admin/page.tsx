import { requireChatGPTUser,chatGPTSignOutPath } from '../chatgpt-auth';
import { isAdmin } from '../admin-auth';
import Editor from './editor';
import { lessons, learningNotes } from '../curriculum';
export const dynamic='force-dynamic';
export default async function AdminPage(){
 await requireChatGPTUser('/admin');
 if(!(await isAdmin()))return <main className="section"><h1>접근 권한이 없습니다</h1><p>지정된 교사 계정으로 로그인해 주세요.</p><a href={chatGPTSignOutPath('/admin')}>로그아웃</a> · <a href="/">수업으로 돌아가기</a></main>;
 return <Editor initial={lessons} notes={learningNotes}/>;
}

