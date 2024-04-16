import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string;
  href: string;
}

const LinkCard = ({ href, title, description }: Props) => {
  return (
    <Link
      href={href}
      className={`
      relative border border-gray-400 rounded-md 
      px-4 py-6 flex justify-between items-center
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-full after:bg-gray-100 after:rounded-md after:z-[-10]
      hover:after:w-full hover:after:transition-all hover:after:duration-300 hover:after:ease-out
        `}
    >
      <span>{title}</span>
      <span className="md:inline hidden font-light text-sm">{description}</span>
    </Link>
  );
};

export default LinkCard;
