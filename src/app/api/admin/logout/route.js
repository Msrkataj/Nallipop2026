import { adminDatabase } from '@/lib/admin/database';
import { apiError, checkOrigin, currentAdmin, privateJson, sessionCookie } from '@/lib/admin/auth';
import { COOKIE_NAME } from '@/lib/admin/security.mjs';
export async function POST(request) {
  try {
    checkOrigin(request);
    const admin = await currentAdmin();
    if(admin) await (await adminDatabase()).collection('admin_sessions').deleteOne({_id:admin.sessionId});
    const response=privateJson({ok:true});
    response.cookies.set(COOKIE_NAME,'',sessionCookie(request,0));
    return response;
  } catch(error) {return apiError(error);}
}
