import { Resend } from "resend"
import type { ManagedReservationStatus } from "@/lib/reservations/status-service"

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function safeEmailData(data: ReservationEmailData): ReservationEmailData {
  return {
    ...data,
    guestName: escapeHtml(data.guestName),
    guestEmail: escapeHtml(data.guestEmail),
    guestPhone: escapeHtml(data.guestPhone),
    roomName: escapeHtml(data.roomName),
    bedConfig: escapeHtml(data.bedConfig),
    guestNotes: data.guestNotes ? escapeHtml(data.guestNotes) : undefined,
  }
}

function emailConfigurationError() {
  return process.env.RESEND_API_KEY ? null : { error: "RESEND_API_KEY no está configurada." }
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
  const configurationError = emailConfigurationError()
  if (configurationError) return configurationError
  data = safeEmailData(data)

  try {
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

  if (error) {
    console.error("Error sending admin email:", error)
    return { error: error.message }
  }
  return {}
  } catch (error) {
    console.error("Error sending admin email:", error)
    return { error: error instanceof Error ? error.message : "Error inesperado de email." }
  }
}

export async function sendGuestConfirmationEmail(data: ReservationEmailData) {
  const configurationError = emailConfigurationError()
  if (configurationError) return configurationError
  const recipient = data.guestEmail
  data = safeEmailData(data)

  try {
  const { error } = await resend.emails.send({
    from: FROM,
    to: recipient,
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

  if (error) {
    console.error("Error sending guest confirmation email:", error)
    return { error: error.message }
  }
  return {}
  } catch (error) {
    console.error("Error sending guest confirmation email:", error)
    return { error: error instanceof Error ? error.message : "Error inesperado de email." }
  }
}

export async function sendReservationStatusEmail(
  data: ReservationEmailData,
  status: ManagedReservationStatus,
) {
  if (status === "confirmed") {
    return sendGuestConfirmationEmail(data)
  }

  const configurationError = emailConfigurationError()
  if (configurationError) return configurationError
  const recipient = data.guestEmail
  const safe = safeEmailData(data)
  const statusCopy = status === "rejected"
    ? {
        subject: "Actualización sobre tu solicitud de reserva en El Cangüé",
        title: "Solicitud no confirmada",
        intro: "Por el momento no pudimos confirmar la disponibilidad solicitada. Podés responder este email para consultar otras fechas o habitaciones.",
      }
    : {
        subject: "Tu reserva en El Cangüé fue cancelada",
        title: "Reserva cancelada",
        intro: "Confirmamos la cancelación de tu reserva. Si querés coordinar una nueva estadía, estamos a disposición.",
      }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: recipient,
      subject: statusCopy.subject,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2c2c2c;">
          <h2 style="font-size: 18px; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
            ${statusCopy.title}
          </h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555;">Hola ${safe.guestName}, ${statusCopy.intro}</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #777; width: 140px;">Email</td><td>${safe.guestEmail}</td></tr>
            <tr><td style="padding: 6px 0; color: #777;">Teléfono</td><td>${safe.guestPhone || "—"}</td></tr>
            <tr><td style="padding: 6px 0; color: #777;">Habitación</td><td>${safe.roomName}</td></tr>
            <tr><td style="padding: 6px 0; color: #777;">Configuración</td><td>${safe.bedConfig}</td></tr>
            <tr><td style="padding: 6px 0; color: #777;">Ingreso</td><td>${formatDate(safe.checkIn)}</td></tr>
            <tr><td style="padding: 6px 0; color: #777;">Salida</td><td>${formatDate(safe.checkOut)}</td></tr>
          </table>
          <p style="font-size: 12px; color: #aaa; margin-top: 24px; letter-spacing: 0.05em;">ESTANCIA EL CANGÜÉ — Posada de Campo</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending reservation status email:", error)
      return { error: error.message }
    }

    return {}
  } catch (error) {
    console.error("Error sending reservation status email:", error)
    return { error: error instanceof Error ? error.message : "Error inesperado de email." }
  }
}
