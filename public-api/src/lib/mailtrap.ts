import { MailtrapClient } from "mailtrap"

const TOKEN = process.env.MAILTRAP_API_TOKEN ?? ""

const client = TOKEN
  ? new MailtrapClient({ token: TOKEN })
  : null

const DEFAULT_FROM = {
  name: "Paleto.rs",
  email: "rezervacije@paleto.rs",
}

export interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html: string
  category?: string
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  if (!client) {
    console.warn("MAILTRAP_API_TOKEN not set, skipping email send")
    return
  }

  await client.send({
    from: DEFAULT_FROM,
    to: [{ email: options.to }],
    subject: options.subject,
    text: options.text,
    html: options.html,
    category: options.category ?? "Reservation",
  })
}
