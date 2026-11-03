import { apiError, privateJson, requireAdmin } from '@/lib/admin/auth';
import { importGallery } from '@/lib/admin/gallery';
export const runtime='nodejs';
export async function POST(request){try{await requireAdmin(request);return privateJson(await importGallery());}catch(error){return apiError(error);}}
