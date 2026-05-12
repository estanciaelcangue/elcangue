import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"
import { updateProfileAction } from "./actions"

interface ProfileRow {
  id: string
  full_name: string
  role: string
  created_at: string
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function AdminUsersPage() {
  const session = await requireAdminSession()

  if (session.profile.role !== "admin") {
    return (
      <div className="border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Solo los administradores pueden gestionar usuarios.
        </p>
      </div>
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false })

  const profiles = (data ?? []) as ProfileRow[]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Admin
        </p>
        <h1 className="mt-2 text-3xl">Usuarios</h1>
      </div>

      {error ? (
        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            No pudimos cargar los usuarios. Revisá que la migración esté
            aplicada en Supabase.
          </p>
        </div>
      ) : profiles.length === 0 ? (
        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Todavía no hay perfiles de usuario.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Alta
                </th>
                <th className="px-4 py-3 text-right font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="border-b border-border last:border-0">
                  <td colSpan={4} className="p-0">
                    <form
                      action={updateProfileAction}
                      className="grid grid-cols-[1fr_130px_auto] items-center gap-3 px-4 py-4 md:grid-cols-[1fr_150px_120px_auto]"
                    >
                      <input type="hidden" name="profile_id" value={profile.id} />
                      <Input
                        name="full_name"
                        defaultValue={profile.full_name}
                        placeholder="Nombre"
                      />
                      <select
                        name="role"
                        defaultValue={profile.role}
                        className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <span className="hidden text-muted-foreground md:inline">
                        {formatDate(profile.created_at)}
                      </span>
                      <Button type="submit" variant="outline" size="icon-sm">
                        <Save />
                        <span className="sr-only">Guardar</span>
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
