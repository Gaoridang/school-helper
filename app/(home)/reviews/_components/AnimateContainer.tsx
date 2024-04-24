"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AnimateContainer = ({ children }: Props) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default AnimateContainer;
