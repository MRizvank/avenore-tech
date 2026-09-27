import type { CaseStudy } from "@/components/CaseStudyStack";
import type { TranslationKey } from "@/contexts/translations";

type Translate = (key: TranslationKey) => string;

const PRIMARY = "#8b5cf6";
const TERTIARY = "#5edf81";

/**
 * Single source of truth for the portfolio. The /work page renders every case
 * through CaseStudyStack; the home page shows a compact preview of the first
 * few via CaseStudyPreview. Order here is display order.
 */
export function buildCaseStudies(t: Translate): CaseStudy[] {
  return [
    {
      id: "01",
      name: "SEQUIFI",
      sub: t("portfolio.seq.sub"),
      tags: [
        t("portfolio.seq.badge1"),
        t("portfolio.seq.badge2"),
        t("portfolio.seq.badge3"),
        "iOS & ANDROID",
      ],
      tagColor: PRIMARY,
      stats: [
        [t("portfolio.seq.stat1v"), t("portfolio.seq.stat1l")],
        [t("portfolio.seq.stat2v"), t("portfolio.seq.stat2l")],
        [t("portfolio.seq.stat3v"), t("portfolio.seq.stat3l")],
      ],
      statColor: PRIMARY,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDsxBnxeCD6XDptNQo2JCgCh3T-sId2JpjS9dKMHALua8QOvBiaOjnXbzXG0dYXnSvGJALYukPCDK9kWLz0-eJ7ZVAheoLUyCOk3S_bllfrCYK28H3t5kHgKnFlHsjr-vA73FV7DnrlEi8FG_x0Ct_4mCJGb0LJgjmvt1dqeWfy4o6Pg-S3LI44NDKOvLRKyPTCabV6XqBbx40GLpuJXUmd3YYd37VUNjVeWxa9Zu1hPmcyrbOiciQsQ",
      desc: t("portfolio.seq.desc"),
      imgRight: true,
      badge: {
        icon: "signal_cellular_alt",
        text: t("portfolio.seq.status"),
        color: TERTIARY,
      },
    },
    {
      id: "02",
      name: "FASH",
      sub: t("portfolio.fash.sub"),
      tags: [
        t("portfolio.fash.badge1"),
        t("portfolio.fash.badge2"),
        t("portfolio.fash.badge3"),
        "MULTI-VENDOR",
        "iOS & ANDROID",
      ],
      tagColor: PRIMARY,
      stats: [
        [t("portfolio.fash.stat1v"), t("portfolio.fash.stat1l")],
        [t("portfolio.fash.stat2v"), t("portfolio.fash.stat2l")],
        [t("portfolio.fash.stat3v"), t("portfolio.fash.stat3l")],
      ],
      statColor: PRIMARY,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRUufcqmMh4VWWuVpcOwi-famrfx-2kUusGrhkklJJ8pM8YiI-UOTejpzJKZPDHyI-yPjKzCzp3QdH6F4qRyVMs15PWK05oKXBQEx-Y3Rdt4V-T3aPKPvdPZlKH5xIZsV7ROgTsf8lxsUJqEXx2dCfW78934MLP-06C_rGaH0Z4v8sArSQnbLF1MrwiAOJvk_rLobTtSWkmE-lXgn9W2q6cPI9JtVw_DVs4U1WfxCzL2JGhmWk2_ftag",
      desc: t("portfolio.fash.desc"),
      imgRight: false,
      badge: {
        icon: "local_fire_department",
        text: t("portfolio.fash.status"),
        color: PRIMARY,
      },
    },
    {
      id: "03",
      name: "MCC DUBAI",
      sub: t("portfolio.mcc.sub"),
      tags: [
        t("portfolio.mcc.badge1"),
        t("portfolio.mcc.badge2"),
        t("portfolio.mcc.badge3"),
        t("portfolio.mcc.badge4"),
      ],
      tagColor: TERTIARY,
      stats: [
        [t("portfolio.mcc.stat1v"), t("portfolio.mcc.stat1l")],
        [t("portfolio.mcc.stat2v"), t("portfolio.mcc.stat2l")],
        [t("portfolio.mcc.stat3v"), t("portfolio.mcc.stat3l")],
      ],
      statColor: TERTIARY,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TUquSS2taI4xb72d6MFbkc1rRU99T4xIAlOtVgeTg1u1ZuRa5Gz2KEHq5FjYdGeyD1VXGBz2g7Mj0Wju21uMIN2L3-qvo1NVfzqEhXnsQy9XszIR7a98W5h6wA51OuTghqDdUqP8eAo1QGBbkDfjgCurp7tKPSPDe_BDoyTh-Wrco4e1_fUFYwD2cmcKyMJBlCgYiF-Db3wKIvXimNmeqv_XAzrUTT5BwWoOzu7KhZ8TTVQ-zoJZfw",
      desc: t("portfolio.mcc.desc"),
      imgRight: true,
      badge: {
        icon: "lock",
        text: t("portfolio.mcc.status"),
        color: PRIMARY,
      },
    },
    {
      id: "04",
      name: "WEYAHOM",
      sub: t("portfolio.wey.sub"),
      tags: [
        t("portfolio.wey.badge1"),
        t("portfolio.wey.badge2"),
        "FLUTTER",
        "iOS & ANDROID",
      ],
      tagColor: PRIMARY,
      stats: [
        ["2", t("portfolio.wey.stat1l")],
        [t("portfolio.wey.stat2v"), t("portfolio.wey.stat2l")],
        ["8", t("portfolio.wey.stat3l")],
      ],
      statColor: PRIMARY,
      img: "/work/weyahom.webp",
      desc: t("portfolio.wey.desc"),
      imgRight: false,
      badge: {
        icon: "child_care",
        text: t("portfolio.wey.status"),
        color: TERTIARY,
      },
      links: [
        {
          label: t("work.appStore"),
          href: "https://apps.apple.com/app/id6784548076",
          icon: "phone_iphone",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.apptology.Weyahom",
          icon: "android",
        },
      ],
    },
  ];
}
