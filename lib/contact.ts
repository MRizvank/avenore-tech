// Inquiries are delivered by FormSubmit (formsubmit.co) straight to CONTACT_EMAIL.
// FormSubmit activates per website ORIGIN: the first submission from each domain (localhost, avenore.tech, ...)
// sends a one-time "Activate Form" email to CONTACT_EMAIL; click it once per domain.
export const CONTACT_EMAIL = "contact@avenore.tech";
export const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// Cal.com booking link for every "Book a call" button, as "username/event-slug" (the part after cal.com/).
export const CAL_LINK = "s-hasan-g3s161/15min";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;

// Confirmation email FormSubmit sends to the person who submitted, the moment their inquiry lands.
export const AUTO_REPLY =
  "Hi {name},\n\nThanks for reaching out to AVENORE. Your project inquiry has landed in our inbox and a real person will read it, not a bot.\n\nExpect a reply from us within two business days. If anything is urgent in the meantime, just reply to this email.\n\nAVENORE\nMobile apps. Digital products. Serious engineering.\n" +
  CONTACT_EMAIL;
