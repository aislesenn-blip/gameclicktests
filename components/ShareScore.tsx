"use client";
import React from "react";
import { useTranslations } from "next-intl";

interface ShareScoreProps {
  score: number | string;
  type: string;
}

const ShareScore: React.FC<ShareScoreProps> = ({ score, type }) => {
  const t = useTranslations("ui");

  const handleShare = () => {
    const text = t("share_txt", { score: score, type: type });
    const shareData = {
      title: "Palmtweets",
      text: text,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert("Score copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-4 px-6 py-2 bg-neon-green/10 border border-neon-green text-neon-green font-bold rounded uppercase tracking-wider hover:bg-neon-green hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)]"
    >
      Share Score
    </button>
  );
};

export default ShareScore;
