"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PRESET_MESSAGES, PRESET_ANSWERS, PRESET_QUESTIONS } from "../constants";

const ChatSupport = () => {
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState(true);
  const [messages, setMessages] = useState(PRESET_MESSAGES);
  const [answered, setAnswered] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handlePressQuestion = (index: number) => {
    const question = messages[index];
    const updatedAnswer = answered.concat(question.answerId);
    setAnswered(updatedAnswer);
    setMessages((prev) => [
      ...prev,
      {
        answerId: "",
        message: question.message,
        isBot: false,
        isUser: true,
        isQuestion: false,
      },
      {
        answerId: "",
        message: PRESET_ANSWERS[question.answerId as keyof typeof PRESET_ANSWERS].message,
        isBot: true,
        isUser: false,
        isQuestion: false,
      },
      ...PRESET_QUESTIONS.filter((q) => !updatedAnswer.includes(q.answerId)),
    ]);
  };

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isOpen]);

  return (
    <div className="fixed bottom-8 right-6">
      <motion.div
        layout
        initial={{ borderRadius: 50, overflow: "hidden" }}
        animate={{
          borderRadius: isOpen ? 10 : 50,
          transition: {
            ease: "easeInOut",
          },
        }}
        className={cn(
          "z-20 h-10 w-10 bg-zinc-700 cursor-pointer flex items-center justify-center",
          {
            "w-64 md:w-72 h-[400px]": isOpen,
          },
        )}
        onClick={() => {
          if (!isOpen) {
            setOpen(true);
            setDisplay(false);
          }
        }}
        onAnimationComplete={() => {
          if (!isOpen) setDisplay(true);
        }}
      >
        {isOpen && (
          <div className="flex flex-col justify-between relative w-full h-full cursor-default overflow-hidden">
            <div className="w-full flex items-center justify-between py-4 px-4 bg-zinc-900 z-20">
              <div
                className="w-3 h-3 rounded-full bg-yellow-400"
                onClick={() => setOpen(false)}
              ></div>
            </div>
            <ScrollArea>
              <div className="p-4 h-full space-y-2">
                {messages.map((message, index) => {
                  if (message.isQuestion) {
                    return (
                      <PresetQuestions
                        key={index}
                        message={message.message}
                        onClick={() => handlePressQuestion(index)}
                      />
                    );
                  } else if (message.isBot) {
                    return <Bot key={index} message={message.message} />;
                  } else if (message.isUser) {
                    return <User key={index} message={message.message} />;
                  }
                })}
              </div>
              <div ref={ref}></div>
            </ScrollArea>
          </div>
        )}
        {display && <span>Chat</span>}
      </motion.div>
    </div>
  );
};

export default ChatSupport;

const Bot = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -10 }}
      animate={{ opacity: 1, translateX: 0, transition: { delay: 0.5 } }}
      className="flex flex-col gap-2 items-start"
    >
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <span className="text-zinc-300">Bot</span>
      </div>
      <p className="text-zinc-100 text-sm">{message}</p>
    </motion.div>
  );
};

const User = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 10, marginBlock: 16 }}
      animate={{ opacity: 1, translateX: 0 }}
      className="flex flex-col gap-2 items-end border-t border-zinc-400 pt-4"
    >
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <span className="text-zinc-300">You</span>
      </div>
      <p className="text-zinc-100 text-sm">{message}</p>
    </motion.div>
  );
};

const PresetQuestions = ({ message, onClick }: { message: string; onClick: VoidFunction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -10 }}
      animate={{ opacity: 1, translateX: 0, transition: { delay: 0.7 } }}
      className="text-zinc-100 bg-zinc-900 py-2 px-3 rounded-md cursor-pointer"
      onClick={onClick}
    >
      {message}
    </motion.div>
  );
};
