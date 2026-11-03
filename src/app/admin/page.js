import { redirect } from 'next/navigation';
import { currentAdmin } from '@/lib/admin/auth';
import AdminGallery from '@/components/AdminGallery';
export const dynamic='force-dynamic';
export default async function AdminPage(){
  const admin=await currentAdmin();
  if(!admin)redirect('/admin/login');
  return <AdminGallery username={admin.username}/>;
}
