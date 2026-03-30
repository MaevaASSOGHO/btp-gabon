import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse qui reçoit les messages du formulaire
const RECIPIENT = process.env.CONTACT_EMAIL ?? "contact@akibabtp.ga";

// Étiquettes lisibles pour l'objet
const SUBJECT_LABELS: Record<string, string> = {
  devis: "Demande de devis",
  info: "Informations complémentaires",
  partenariat: "Partenariat & collaboration",
  recrutement: "Question RH / recrutement",
  autre: "Autre demande",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, firstName, lastName, company, email, phone, message } = body;

    // Validation basique
    if (!subject || !firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
    const fullName = `${firstName} ${lastName}`;

    // ── Email reçu par AKIBA BTP ──────────────────────────────
    await resend.emails.send({
      from: "Formulaire AKIBA BTP <no-reply@akibabtp.ga>",
      to: [RECIPIENT],
      replyTo: email,
      subject: `[${subjectLabel}] Message de ${fullName}`,
      html: `
        <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">

          <!-- Header -->
          <div style="background: #0B2545; padding: 32px 40px; border-radius: 16px 16px 0 0;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <div style="width: 36px; height: 36px; background: #C8A96E; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: 900; font-size: 16px;">A</span>
              </div>
              <span style="color: white; font-weight: 900; font-size: 20px; letter-spacing: -0.5px;">AKIBA BTP</span>
            </div>
            <p style="color: #93B4D0; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Nouveau message reçu</p>
          </div>

          <!-- Objet badge -->
          <div style="background: #F7F9FC; padding: 20px 40px; border-left: 4px solid #C8A96E;">
            <p style="margin: 0; font-size: 12px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Objet</p>
            <p style="margin: 0; font-weight: 700; color: #0B2545; font-size: 16px;">${subjectLabel}</p>
          </div>

          <!-- Corps -->
          <div style="padding: 32px 40px;">

            <!-- Infos expéditeur -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 40%;">Nom</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #0B2545; font-weight: 600; font-size: 14px;">${fullName}</td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Entreprise</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #0B2545; font-weight: 600; font-size: 14px;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 14px;"><a href="mailto:${email}" style="color: #C8A96E; font-weight: 600;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #0B2545; font-weight: 600; font-size: 14px;">${phone}</td>
              </tr>` : ""}
            </table>

            <!-- Message -->
            <p style="font-size: 12px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message</p>
            <div style="background: #F7F9FC; border-radius: 12px; padding: 20px 24px; border-left: 3px solid #C8A96E;">
              <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>

            <!-- CTA répondre -->
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${subjectLabel}"
                style="display: inline-block; padding: 14px 32px; background: #0B2545; color: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">
                Répondre à ${firstName} →
              </a>
            </div>
          </div>

          <!-- Footer email -->
          <div style="background: #071829; padding: 20px 40px; border-radius: 0 0 16px 16px; text-align: center;">
            <p style="color: #4B5563; font-size: 12px; margin: 0;">
              Message reçu via le formulaire de contact · akibabtp.ga<br/>
              ${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      `,
    });

    // ── Email de confirmation à l'expéditeur ─────────────────
    await resend.emails.send({
      from: "AKIBA BTP <no-reply@akibabtp.ga>",
      to: [email],
      subject: "Nous avons bien reçu votre message — AKIBA BTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0B2545; padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: center;">
            <div style="width: 48px; height: 48px; background: #C8A96E; border-radius: 12px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: 900; font-size: 20px;">A</span>
            </div>
            <h1 style="color: white; font-size: 22px; font-weight: 900; margin: 0;">AKIBA BTP</h1>
            <p style="color: #93B4D0; font-size: 12px; margin: 8px 0 0; text-transform: uppercase; letter-spacing: 2px;">Gabon</p>
          </div>

          <div style="padding: 40px;">
            <h2 style="color: #0B2545; font-size: 22px; font-weight: 900; margin: 0 0 16px;">Bonjour ${firstName},</h2>
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              Nous avons bien reçu votre message concernant : <strong style="color: #C8A96E;">${subjectLabel}</strong>.
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              Notre équipe vous répondra dans les <strong>48 heures ouvrées</strong>. Si votre demande est urgente, n&apos;hésitez pas à nous appeler directement.
            </p>

            <div style="background: #F7F9FC; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
              <p style="font-size: 13px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Votre récapitulatif</p>
              <p style="margin: 4px 0; font-size: 14px; color: #374151;"><strong>Objet :</strong> ${subjectLabel}</p>
              <p style="margin: 4px 0; font-size: 14px; color: #374151;"><strong>Email :</strong> ${email}</p>
              ${phone ? `<p style="margin: 4px 0; font-size: 14px; color: #374151;"><strong>Téléphone :</strong> ${phone}</p>` : ""}
            </div>

            <div style="border-top: 1px solid #F3F4F6; padding-top: 24px;">
              <p style="color: #9CA3AF; font-size: 13px; margin: 0 0 8px;">Vous pouvez aussi nous joindre directement :</p>
              <p style="margin: 4px 0; font-size: 14px; color: #374151;">📞 <a href="tel:+24101000000" style="color: #C8A96E; font-weight: 600;">+241 01 00 00 00</a></p>
              <p style="margin: 4px 0; font-size: 14px; color: #374151;">✉️ <a href="mailto:contact@akibabtp.ga" style="color: #C8A96E; font-weight: 600;">contact@akibabtp.ga</a></p>
            </div>
          </div>

          <div style="background: #071829; padding: 20px 40px; border-radius: 0 0 16px 16px; text-align: center;">
            <p style="color: #4B5563; font-size: 12px; margin: 0;">
              © 2024 AKIBA BTP Gabon · Boulevard Triomphal, Libreville<br/>
              Cet email est automatique, merci de ne pas y répondre directement.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi. Veuillez réessayer." }, { status: 500 });
  }
}
