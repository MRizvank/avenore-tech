"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  text: string;
  as?: "h2" | "h3" | "p";
  /** Phrase inside `text` that is rendered in `highlightColor`. Ignored when not found. */
  highlight?: string;
  highlightColor?: string;
  /** Opacity each word starts at before the scroll reveals it. */
  dim?: number;
  /** ScrollTrigger positions for the reveal window. */
  start?: string;
  end?: string;
  style?: CSSProperties;
  className?: string;
};

type Token = { text: string; word: boolean; hl: boolean };

// Splits text into words (one span each) and the whitespace between them.
// Punctuation glued to a word stays inside that word's span so it fades with it.
// Intl.Segmenter handles languages without spaces (zh, ja); the regex is the fallback.
function tokenize(text: string, highlight?: string): Token[] {
  const needle = highlight?.trim().toLowerCase();
  const hlStart = needle ? text.toLowerCase().indexOf(needle) : -1;
  const hlEnd = hlStart >= 0 && needle ? hlStart + needle.length : -1;

  const segments: { text: string; index: number; wordLike: boolean }[] = [];
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "word" });
    for (const s of segmenter.segment(text)) {
      segments.push({ text: s.segment, index: s.index, wordLike: !!s.isWordLike });
    }
  } else {
    const re = /\S+|\s+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      segments.push({ text: m[0], index: m.index, wordLike: /\S/.test(m[0]) });
    }
  }

  const tokens: Token[] = [];
  let prevWasSpace = true;
  for (const s of segments) {
    const isSpace = /^\s+$/.test(s.text);
    if (isSpace) {
      tokens.push({ text: s.text, word: false, hl: false });
    } else if (!s.wordLike && !prevWasSpace && tokens.length && tokens[tokens.length - 1].word) {
      tokens[tokens.length - 1].text += s.text; // attach punctuation to the previous word
    } else {
      tokens.push({ text: s.text, word: true, hl: s.index >= hlStart && s.index < hlEnd });
    }
    prevWasSpace = isSpace;
  }
  return tokens;
}

export default function ScrollRevealText({
  text,
  as: Tag = "p",
  highlight,
  highlightColor = "#8b5cf6",
  dim = 0.16,
  start = "top 85%",
  end = "bottom 45%",
  style,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const tokens = useMemo(() => tokenize(text, highlight), [text, highlight]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const words = el.querySelectorAll<HTMLElement>(".srt-word");
      if (!words.length) return;

      gsap.fromTo(
        words,
        { opacity: dim },
        {
          opacity: 1,
          ease: "none",
          duration: 1,
          stagger: 0.5,
          scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
        },
      );
    },
    { scope: ref, dependencies: [tokens, dim, start, end], revertOnUpdate: true },
  );

  return (
    // Server HTML is fully opaque; the dimming is applied on the client before paint.
    <Tag ref={ref as never} style={style} className={className}>
      {tokens.map((tk, i) =>
        tk.word ? (
          <span
            key={i}
            className="srt-word"
            style={tk.hl ? { color: highlightColor } : undefined}
          >
            {tk.text}
          </span>
        ) : (
          tk.text
        ),
      )}
    </Tag>
  );
}
