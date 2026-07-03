import type { Metadata } from "next";
import { auth } from "@/auth";
import { Sidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-mist">
      <Sidebar email={session?.user?.email} />
      <div className="pl-64">
        <main className="mx-auto max-w-5xl px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
