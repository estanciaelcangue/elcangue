import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Switch to "El Cangüé <reservas@elcangue.com.uy>" once the domain is verified in Resend
const FROM = process.env.RESEND_FROM ?? "El Cangüé <onboarding@resend.dev>"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "supabasefichas@gmail.com"

export type ReservationEmailData = {
  guestName: string
  guestEmail: string
  guestPhone: string
  roomName: string
  bedConfig: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  guestNotes?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export async function sendAdminNewReservationEmail(data: ReservationEmailData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Nueva solicitud de reserva — ${data.roomName} (${data.guestName})`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2c2c2c;">
        <h2 style="font-size: 18px; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
          Nueva solicitud de reserva
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #777; width: 140px;">Habitación</td>
            <td style="padding: 6px 0; font-weight: bold;">${data.roomName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Camas</td>
            <td style="padding: 6px 0;">${data.bedConfig}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Ingreso</td>
            <td style="padding: 6px 0;">${formatDate(data.checkIn)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Salida</td>
            <td style="padding: 6px 0;">${formatDate(data.checkOut)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Adultos</td>
            <td style="padding: 6px 0;">${data.adults}${data.children > 0 ? ` + ${data.children} menor${data.children > 1 ? "es" : ""}` : ""}</td>
          </tr>
        </table>

        <h3 style="font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 24px;">Datos del huésped</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #777; width: 140px;">Nombre</td>
            <td style="padding: 6px 0;">${data.guestName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Email</td>
            <td style="padding: 6px 0;">${data.guestEmail}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Teléfono</td>
            <td style="padding: 6px 0;">${data.guestPhone || "—"}</td>
          </tr>
          ${data.guestNotes ? `
          <tr>
            <td style="padding: 6px 0; color: #777; vertical-align: top;">Notas</td>
            <td style="padding: 6px 0;">${data.guestNotes}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top: 28px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://elcangue.com.uy"}/admin/reservas"
             style="display: inline-block; padding: 10px 24px; background: #2c2c2c; color: #fff; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">
            Ver en el panel
          </a>
        </div>
      </div>
    `,
  })

  if (error) console.error("Error sending admin email:", error)
}

export async function sendGuestConfirmationEmail(data: ReservationEmailData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: data.guestEmail,
    subject: `Tu reserva en El Cangüé está confirmada — ${data.roomName}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2c2c2c;">
        <h2 style="font-size: 18px; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
          ¡Tu reserva está confirmada!
        </h2>

        <p style="font-size: 14px; line-height: 1.6; color: #555;">
          Hola ${data.guestName}, estamos encantados de recibirte en la Estancia El Cangüé.
          A continuación el detalle de tu reserva:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #777; width: 140px;">Habitación</td>
            <td style="padding: 6px 0; font-weight: bold;">${data.roomName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Camas</td>
            <td style="padding: 6px 0;">${data.bedConfig}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Ingreso</td>
            <td style="padding: 6px 0;">${formatDate(data.checkIn)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Salida</td>
            <td style="padding: 6px 0;">${formatDate(data.checkOut)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Huéspedes</td>
            <td style="padding: 6px 0;">${data.adults} adulto${data.adults > 1 ? "s" : ""}${data.children > 0 ? ` + ${data.children} menor${data.children > 1 ? "es" : ""}` : ""}</td>
          </tr>
        </table>

        <p style="font-size: 13px; line-height: 1.6; color: #777; border-top: 1px solid #eee; padding-top: 16px; margin-top: 16px;">
          Para cualquier consulta respondé este email o escribinos por WhatsApp.<br/>
          ¡Hasta pronto!
        </p>

        <p style="font-size: 12px; color: #aaa; margin-top: 24px; letter-spacing: 0.05em;">
          ESTANCIA EL CANGÜÉ — Posada de Campo
        </p>
      </div>
    `,
  })

  if (error) console.error("Error sending guest confirmation email:", error)
}
