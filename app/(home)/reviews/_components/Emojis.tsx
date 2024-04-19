"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const emojiList = {
  happy: "😆",
  sad: "🥲",
  surprised: "😲",
  love: "😘",
  like: "👍",
  fire: "🔥",
  celebrate: "🎉",
};

const Emojis = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  return (
    <div className="relative flex flex-wrap gap-1 space-x-2 justify-end">
      <AnimatePresence>
        {selectedEmoji === null ? (
          Object.entries(emojiList).map(([label, emoji], index) => (
            <motion.button
              key={label}
              className={cn(
                "text-xl px-3 rounded-xl border border-slate-300 hover:border-slate-900 transition-colors bg-white",
              )}
              onClick={() => handleEmojiClick(label)}
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 * (6 - index) }}
              transition={{ duration: 0.2 }}
            >
              {emoji}
            </motion.button>
          ))
        ) : (
          <motion.button
            layoutId={selectedEmoji.toString()}
            className="absolute right-0 top-0 text-xl px-3 rounded-xl border border-[#57BD9E] bg-white"
            onClick={() => setSelectedEmoji(null)}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {emojiList[selectedEmoji as keyof typeof emojiList]}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Emojis;
