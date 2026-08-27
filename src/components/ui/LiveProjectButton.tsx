import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  className = '',
  href,
  onClick,
  ...props
}) => {
  const content = (
    <motion.span
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer select-none px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
    >
      Live Project
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block no-underline" onClick={onClick}>
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
