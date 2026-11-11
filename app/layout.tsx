import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'2027 우리들의 문학수업',description:'양지고등학교 1학년을 위한 문학 수업'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ko"><body>{children}</body></html>; }
