import { redirect } from "next/navigation"
import { LoginForm } from "./login-form"
import { getAdminSession } from "@/lib/admin/auth"

export default async function AdminLoginPage() {
  const session = await getAdminSession()

  if (session) {
    redirect("/admin/blog")
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-sm flex-col justify-center">
        <div className="border border-border bg-card p-6 shadow-sm">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              El Cangue
            </p>
            <h1 className="text-3xl">Administración</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
