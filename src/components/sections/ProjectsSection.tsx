import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';
import { LiveProjectButton } from '../ui/LiveProjectButton';
import { ContactButton } from '../ui/ContactButton';

interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'nextlevel-studio',
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    id: 'aura-brand',
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    id: 'solaris-digital',
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[580px] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(5.5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA] tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href="#projects" />
        </div>

        {/* Bottom Row - Two Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 pt-4 sm:pt-6 h-full items-stretch">
          {/* Left Column (40% width / 4 cols) - 2 stacked images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6 justify-between">
            <div
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-[#161616] border border-white/5"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.images.col1Top}
                alt={`${project.name} preview 1`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-[#161616] border border-white/5"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width / 6 cols) - 1 tall image */}
          <div className="md:col-span-6 w-full h-full min-h-[260px] overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-[#161616] border border-white/5">
            <img
              src={project.images.col2}
              alt={`${project.name} preview main`}
              className="w-full h-full object-cover min-h-[260px] md:min-h-full transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 md:pt-36 pb-32 select-none"
    >
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-24 md:mb-32 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      {/* Sticky Stacking Project Cards Container */}
      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-20 md:gap-24 relative pb-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>

      {/* Footer / Contact callout */}
      <footer id="contact" className="max-w-6xl mx-auto pt-24 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div className="flex flex-col gap-2">
          <span className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Jack &mdash; 3D Creator
          </span>
          <p className="text-[#D7E2EA]/60 text-sm font-light uppercase tracking-wider">
            Available for freelance projects & creative collaborations worldwide
          </p>
        </div>

        <div className="flex items-center gap-6">
          <ContactButton href="mailto:contact@jack3dcreator.com" />
        </div>
      </footer>
    </section>
  );
};
