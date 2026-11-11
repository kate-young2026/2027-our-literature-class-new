import { env } from 'cloudflare:workers';
import { getChatGPTUser } from './chatgpt-auth';
export async function isAdmin() {
 const user = await getChatGPTUser();
 const allowed = env.ADMIN_EMAIL?.trim().toLowerCase();
 return Boolean(user && allowed && user.email.trim().toLowerCase() === allowed);
}
