import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Angry from "@/public/angry.svg";
import Laugh from "@/public/laughing.svg";
import Like from "@/public/like.svg";
import Love from "@/public/love.svg";
import More from "@/public/more.json";
import Sad from "@/public/sad.svg";
import Soaked from "@/public/soaked.svg";
import { Tooltip } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";

const emojiList = {
  좋음: Like,
  사랑: Love,
  웃음: Laugh,
  슬픔: Sad,
  놀람: Soaked,
  화남: Angry,
};

const Emojis = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const emojiContainerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiContainerRef.current && !emojiContainerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const emojiContainer = {
    open: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      translateX: "-50%",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const item = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <div
      className="relative w-10 h-6 rounded-xl border bg-white cursor-pointer"
      onClick={() => setOpen(!open)}
      ref={emojiContainerRef}
    >
      <Lottie
        animationData={More}
        play
        loop
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none"
      />
      <motion.div
        className="absolute flex flex-col gap-2 top-8 left-1/2 bg-white"
        variants={emojiContainer}
        initial="closed"
        animate={open ? "open" : "closed"}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {Object.entries(emojiList).map((emoji, index) => (
          <TooltipProvider key={emoji[0]}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  onClick={() => handleEmojiClick(emoji[0])}
                  className={cn("w-8 h-8 rounded-full flex items-center justify-center")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variants={item}
                >
                  <Image src={emoji[1]} alt={emoji[0]} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" align="center" className="bg-gray-900 text-white">
                {emoji[0]}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </motion.div>
    </div>
  );
};

export default Emojis;
