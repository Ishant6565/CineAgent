import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  href,
  onClick,
  ...props
}) => {
  const content = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest transition-all duration-300 select-none cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block no-underline" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block bg-transparent border-0 p-0 cursor-pointer"
      {...props}
    >
      {content}
    </button>
  );
};
