import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20 select-none pointer-events-none" aria-hidden="true">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  wordStartIndex: number;
  totalLength: number;
}

const Word: React.FC<WordProps> = ({ word, progress, wordStartIndex, totalLength }) => {
  const characters = word.split('');
  return (
    <span className="inline-block whitespace-nowrap">
      {characters.map((char, index) => {
        const charGlobalIndex = wordStartIndex + index;
        const start = charGlobalIndex / totalLength;
        const end = Math.min(1, (charGlobalIndex + 1) / totalLength);
        return (
          <Character
            key={index}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let runningIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-center font-medium leading-relaxed max-w-[560px] text-[#D7E2EA] flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, wordIndex) => {
        const currentWordStart = runningIndex;
        runningIndex += word.length + 1; // +1 for the space
        return (
          <Word
            key={wordIndex}
            word={word}
            progress={scrollYProgress}
            wordStartIndex={currentWordStart}
            totalLength={text.length}
          />
        );
      })}
    </p>
  );
};
