import Link from "next/link"
import { FileText, Home, LogOut, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { requireAdminSession } from "@/lib/admin/auth"
import { logoutAction } from "./actions"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile, user } = await requireAdminSession()
  const displayName = profile.full_name || user.email || "Usuario"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin/blog" className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            El Cangue Admin
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {profile.role}
              </p>
            </div>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut />
                Salir
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-border bg-card lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r">
          <nav className="flex gap-2 px-4 py-4 lg:flex-col lg:px-6">
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/admin/blog">
                <FileText />
                Blog
              </Link>
            </Button>
            {profile.role === "admin" && (
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/usuarios">
                  <Users />
                  Usuarios
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/">
                <Home />
                Sitio
              </Link>
            </Button>
          </nav>
        </aside>

        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
