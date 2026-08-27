import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'nav';
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  style,
}) => {
  const MotionComponent = motion[as] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};
