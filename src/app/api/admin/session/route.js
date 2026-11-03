import { apiError, privateJson, requireAdmin } from '@/lib/admin/auth';
export async function GET() {
  try {const admin=await requireAdmin();return privateJson({username:admin.username});}
  catch(error){return apiError(error);}
}
