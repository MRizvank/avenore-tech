import type { AnchorHTMLAttributes } from "react";
import { CAL_LINK, CAL_URL } from "@/lib/contact";

// "Book a call" link. CalEmbed turns clicks on it into the Cal.com booking modal.
export default function CalButton(
  props: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">
) {
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      {...props}
    />
  );
}
