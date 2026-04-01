"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Calendar, Sparkles, TrendingUp, ArrowUp, ChevronDown, Plus, Phone, Mail, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate, AnimatePresence, useSpring } from 'motion/react';
import Cal, { getCalApi } from "@calcom/embed-react";
import LogoMarquee from '@/components/ui/logo-marquee';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast, Toaster } from 'sonner';
import { SubstackFeed } from '@/components/SubstackFeed';

const AnimatedNumber = ({ value }: { value: number }) => {
  const safeValue = (typeof value === 'number' && isFinite(value) && !isNaN(value)) ? value : 0;
  const spring = useSpring(safeValue, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(safeValue);
  }, [spring, safeValue]);

  return <motion.span>{display}</motion.span>;
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const textSegments = [
  { text: "I'm a versatile ", color: "#ffffff" },
  { text: "designer who partners with founders to turn ideas into real products.", color: "#FF4D2E" },
  { text: " I focus on clear interfaces, sharp decisions, and fast execution.", color: "#ffffff" }
];

const totalChars = textSegments.reduce((acc, seg) => acc + seg.text.length, 0);

const Char = ({ children, progress, range, targetColor }: { children: string, progress: any, range: [number, number], targetColor: string, key?: any }) => {
  const color = useTransform(progress, range, ["#333333", targetColor]);
  return <motion.span style={{ color }}>{children}</motion.span>;
};

const Stardust = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {[...Array(40)].map((_, i) => {
        const startX = (Math.random() - 0.5) * 200;
        const startY = -100 - Math.random() * 50;
        const endX = startX + (Math.random() - 0.5) * 50;
        const endY = 100 + Math.random() * 150;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: startX, y: startY, scale: Math.random() * 1.5 + 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: endX, 
              y: endY,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 1.5 + Math.random(), 
              ease: "easeOut",
              times: [0, 0.2, 0.8, 1]
            }}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
          />
        );
      })}
    </div>
  );
};

const ServiceNumber = ({ id }: { id: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-30% 0px" });

  return (
    <div className="lg:col-span-5 flex justify-start lg:justify-center relative h-full">
      <div className="sticky top-32 flex items-center justify-center w-full h-fit relative py-10">
        <div ref={ref} className="relative flex items-center justify-center perspective-[1000px]">
          <Stardust active={isInView} />
          <motion.span
            initial={{ rotateX: 80, opacity: 0, scale: 0.5, y: 100, filter: "blur(10px)" }}
            animate={isInView ? { rotateX: 0, opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : { rotateX: -80, opacity: 0, scale: 0.5, y: -100, filter: "blur(10px)" }}
            transition={{ duration: 1.4, type: "spring", bounce: 0.4, damping: 20 }}
            className="text-[150px] md:text-[250px] lg:text-[320px] leading-none font-light tracking-tighter slashed-zero inline-block"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
              color: 'transparent',
              transformStyle: "preserve-3d"
            }}
          >
            {id}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    id: "01",
    title: "Branding & Identity",
    description: "Crafting memorable brands that resonate with your audience. We build cohesive visual identities that tell your story and establish trust from the first interaction.",
    items: [
      { name: "Brand Strategy & Positioning", tooltip: "Defining your unique value proposition and market position." },
      { name: "Logo & Visual Identity", tooltip: "Creating a memorable and versatile visual representation of your brand." },
      { name: "Brand Guidelines", tooltip: "Establishing rules for consistent brand application across all channels." },
      { name: "Marketing Collateral", tooltip: "Designing branded materials for digital and print marketing." },
      { name: "Motion & Interaction Design", tooltip: "Adding dynamic movement to bring your brand to life." }
    ]
  },
  {
    id: "02",
    title: "Web Design",
    description: "Designing intuitive, conversion-focused websites. We create digital experiences that are not only visually stunning but also strategically structured to drive results.",
    items: [
      { name: "UI/UX Design", tooltip: "Crafting user-centric interfaces that are beautiful and easy to use." },
      { name: "Wireframing & Prototyping", tooltip: "Mapping out structure and flow before full-scale design." },
      { name: "Landing Page Optimization", tooltip: "Designing high-converting pages tailored to specific campaigns." },
      { name: "E-commerce Design", tooltip: "Creating seamless shopping experiences that drive sales." },
      { name: "Interactive Experiences", tooltip: "Engaging users with immersive and interactive web elements." }
    ]
  },
  {
    id: "03",
    title: "Web Development",
    description: "Building robust, scalable, and high-performance websites. We turn designs into flawless, responsive code using the latest modern web technologies.",
    items: [
      { name: "Frontend Development (React, Vue)", tooltip: "Building fast, interactive user interfaces with modern frameworks." },
      { name: "Framer & Webflow Development", tooltip: "Developing visually rich, easy-to-manage sites using no-code/low-code tools." },
      { name: "CMS Integration & Setup", tooltip: "Implementing content management systems for easy updates." },
      { name: "Performance Optimization", tooltip: "Ensuring lightning-fast load times and smooth performance." },
      { name: "Technical SEO", tooltip: "Optimizing code and structure for better search engine visibility." }
    ]
  },
  {
    id: "04",
    title: "Product Design",
    description: "Designing complex web and mobile applications with a focus on user experience. We simplify intricate workflows into elegant, user-friendly interfaces.",
    items: [
      { name: "SaaS Application Design", tooltip: "Designing scalable and intuitive software-as-a-service platforms." },
      { name: "Mobile App Design (iOS/Android)", tooltip: "Crafting native app experiences for mobile users." },
      { name: "Design Systems", tooltip: "Creating reusable component libraries for consistent design." },
      { name: "User Research & Testing", tooltip: "Gathering insights to inform and validate design decisions." },
      { name: "Dashboard & Analytics UI", tooltip: "Designing clear and actionable data visualizations." }
    ]
  }
];

const ServiceBlock = ({ service, index }: { service: any, index: number }) => {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax for the text content
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start min-h-[60vh] py-12">
      <ServiceNumber id={service.id} />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="lg:col-span-7 flex flex-col gap-8 md:gap-12 pt-4 md:pt-12"
      >
        <div 
          className="flex flex-col gap-6 cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter group-hover:text-[#FF4D2E] transition-colors duration-300">
              {service.title}
            </h3>
            <div className="flex items-center gap-3 bg-white/5 group-hover:bg-white/10 border border-white/10 rounded-full px-5 py-3 transition-colors duration-300 shrink-0 w-fit">
              <span className="text-sm font-medium text-white uppercase tracking-wider">
                {isExpanded ? 'Close' : 'Explore Services'}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center text-white shrink-0"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
          <p className="text-[#a3a3a3] text-lg md:text-xl leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col border-t border-white/20">
                {service.items.map((item: any, i: number) => (
                  <Tooltip key={i}>
                    <TooltipTrigger className="w-full text-left">
                      <div className="group/item relative flex justify-between items-center py-4 md:py-6 border-b border-white/20 cursor-help">
                        <span className="text-base md:text-xl font-medium group-hover/item:text-[#FF4D2E] transition-colors">{item.name}</span>
                        <span className="text-[#a3a3a3] font-mono text-sm md:text-base group-hover/item:text-[#FF4D2E] transition-colors">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="start" className="bg-[#1a1a1a] text-white border border-white/10 shadow-xl p-3 max-w-xs z-[100]">
                      <p className="text-sm leading-relaxed">{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechStart",
    contentSegments: [
      { text: "Edmond completely transformed our online presence. ", color: "#ffffff" },
      { text: "The new design is not only beautiful but has significantly increased our conversion rates. ", color: "#FF4D2E" },
      { text: "His attention to detail and understanding of our brand was exceptional.", color: "#ffffff" }
    ],
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    name: "Marcus Chen",
    role: "Founder, InnovateCo",
    contentSegments: [
      { text: "Working with Edmond was a breeze. ", color: "#ffffff" },
      { text: "He took our complex requirements and turned them into a seamless, intuitive user experience. ", color: "#FF4D2E" },
      { text: "The feedback from our users has been overwhelmingly positive.", color: "#ffffff" }
    ],
    avatar: "https://picsum.photos/seed/marcus/100/100"
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, GrowthInc",
    contentSegments: [
      { text: "I've worked with many designers, but Edmond stands out. ", color: "#ffffff" },
      { text: "He doesn't just design; he thinks about the business goals and how the design can achieve them. ", color: "#FF4D2E" },
      { text: "A true partner in our success.", color: "#ffffff" }
    ],
    avatar: "https://picsum.photos/seed/elena/100/100"
  }
];

const projectsData = [
  {
    id: 1,
    year: "2024",
    title: "Architech Buildings",
    description: "We redefined the concept of modern living by creating a design that challenges conventional boundaries. Focusing on comfort, functionality, and unexpected elements, we transformed the ordinary into something extraordinary.",
    categories: ["Mobile App", "Branding", "Website Design"],
    image: "https://picsum.photos/seed/proj1/1200/800",
    link: "#"
  },
  {
    id: 2,
    year: "2023",
    title: "Fintech Dashboard",
    description: "A comprehensive financial dashboard that simplifies complex data into intuitive visualizations, empowering users to make informed decisions with confidence and clarity.",
    categories: ["Web Application", "UI/UX Design", "Design System"],
    image: "https://picsum.photos/seed/proj2/1200/800",
    link: "#"
  }
];

const Step1UI = () => (
  <div className="w-full max-w-[280px] bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
    <div className="flex justify-between items-center mb-6">
      <div className="w-10 h-10 rounded-full bg-[#FF4D2E]/20 flex items-center justify-center text-[#FF4D2E]">
        <Calendar className="w-5 h-5" />
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-3/4 bg-white/10 rounded-md" />
      <div className="h-4 w-1/2 bg-white/5 rounded-md" />
    </div>
    <div className="mt-6 grid grid-cols-4 gap-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`aspect-square rounded-md ${i === 3 ? 'bg-[#FF4D2E]' : 'bg-white/5'}`} />
      ))}
    </div>
    <div className="mt-6 h-10 w-full bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 rounded-lg flex items-center justify-center">
      <span className="text-[#FF4D2E] text-sm font-medium">Confirm Time</span>
    </div>
  </div>
);

const Step2UI = () => (
  <div className="w-full max-w-[300px] relative z-10 group-hover:scale-105 transition-transform duration-500">
    <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#FF4D2E]/20 to-transparent rounded-full blur-2xl" />
    <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative z-20">
      <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="p-5 font-mono text-xs text-white/60 space-y-2">
        <div className="flex gap-4"><span className="text-pink-400">import</span> <span className="text-white/90">AI</span> <span className="text-pink-400">from</span> <span className="text-green-400">'@/core'</span>;</div>
        <div className="flex gap-4"><span className="text-pink-400">const</span> <span className="text-blue-400">system</span> <span className="text-pink-400">=</span> <span className="text-yellow-400">new</span> <span className="text-white/90">AI</span>();</div>
        <div className="h-2" />
        <div className="flex gap-4"><span className="text-blue-400">system</span>.<span className="text-yellow-400">optimize</span>({'{'}</div>
        <div className="flex gap-4 pl-4"><span className="text-white/90">performance:</span> <span className="text-orange-400">true</span>,</div>
        <div className="flex gap-4 pl-4"><span className="text-white/90">design:</span> <span className="text-green-400">'flawless'</span></div>
        <div className="flex gap-4">{'}'});</div>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 bg-[#222] border border-white/10 rounded-lg p-3 shadow-xl z-30 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
        <Sparkles className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-medium text-white/90">Generated</div>
        <div className="text-[10px] text-white/40">0.2s elapsed</div>
      </div>
    </div>
  </div>
);

const Step3UI = () => (
  <div className="w-full max-w-[300px] flex flex-col gap-4 relative z-10 group-hover:scale-105 transition-transform duration-500">
    <div className="flex gap-4">
      <div className="flex-1 bg-[#1a1a1a] rounded-xl border border-white/10 p-4 shadow-xl">
        <div className="text-white/40 text-xs mb-1">Conversion</div>
        <div className="text-xl font-medium text-white">+24%</div>
        <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[70%]" />
        </div>
      </div>
      <div className="flex-1 bg-[#1a1a1a] rounded-xl border border-white/10 p-4 shadow-xl">
        <div className="text-white/40 text-xs mb-1">Speed</div>
        <div className="text-xl font-medium text-white">0.8s</div>
        <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[90%]" />
        </div>
      </div>
    </div>
    <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-5 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-white/90">Growth Trend</div>
        <TrendingUp className="w-4 h-4 text-[#FF4D2E]" />
      </div>
      <div className="flex items-end gap-2 h-24">
        {[40, 30, 50, 45, 70, 65, 90].map((height, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group">
            <div 
              className={`absolute bottom-0 left-0 w-full rounded-t-sm transition-all duration-500 ${i === 6 ? 'bg-[#FF4D2E]' : 'bg-white/20'}`} 
              style={{ height: `${height}%` }} 
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Step4UI = () => (
  <div className="w-full max-w-[300px] bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4D2E] to-transparent opacity-50" />
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-white font-medium text-sm">Project Live</div>
          <div className="text-white/40 text-xs">All systems operational</div>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-white/60 text-sm">Uptime</span>
        <span className="text-green-400 font-mono text-sm">99.9%</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-white/60 text-sm">Load Time</span>
        <span className="text-blue-400 font-mono text-sm">0.4s</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-white/60 text-sm">SEO Score</span>
        <span className="text-purple-400 font-mono text-sm">100/100</span>
      </div>
    </div>
  </div>
);

const Step5UI = () => (
  <div className="w-full max-w-[300px] bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4D2E] to-transparent opacity-50" />
    <div className="flex justify-between items-center mb-6">
      <div className="text-white/80 text-sm font-medium">System Performance</div>
      <div className="text-green-400 text-xs font-mono">+98%</div>
    </div>
    <div className="relative w-32 h-32 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <motion.circle 
          cx="50" cy="50" r="40" fill="none" stroke="#FF4D2E" strokeWidth="8"
          strokeDasharray="251.2"
          initial={{ strokeDashoffset: 251.2 }}
          whileInView={{ strokeDashoffset: 251.2 * 0.02 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-white">98</span>
        <span className="text-[10px] text-white/50 tracking-widest">SCORE</span>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ duration: 1 }} />
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full bg-purple-500" initial={{ width: 0 }} whileInView={{ width: "92%" }} transition={{ duration: 1, delay: 0.2 }} />
      </div>
    </div>
  </div>
);

const processSteps = [
  {
    id: "1",
    title: "Discovery & Strategy",
    description: "We start with a deep dive into your business, goals, and target audience. We'll outline the project scope, timeline, and define a clear strategy for success.",
    visual: <Step1UI />
  },
  {
    id: "2",
    title: "Design & Prototyping",
    description: "Translating strategy into visual concepts. We create wireframes and high-fidelity designs, iterating based on your feedback until we achieve the perfect look and feel.",
    visual: <Step2UI />
  },
  {
    id: "3",
    title: "Development & Testing",
    description: "Bringing the designs to life with clean, efficient code. We build robust systems and rigorously test across devices to ensure a flawless user experience.",
    visual: <Step3UI />
  },
  {
    id: "4",
    title: "Launch & Support",
    description: "Deploying your project to the world. We handle the technical setup and provide ongoing support and optimization to ensure long-term performance and growth.",
    visual: <Step4UI />
  },
  {
    id: "5",
    title: "Performance Optimization",
    description: "We continuously monitor and refine your digital product. By analyzing user behavior and system performance, we implement data-driven optimizations to maximize speed, engagement, and conversion rates.",
    visual: <Step5UI />
  }
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const animationProgress = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      animationProgress.set(0);
      const controls = animate(animationProgress, 1, { duration: 2.5, ease: "easeInOut" });
      return () => controls.stop();
    }
  }, [isInView, activeIndex, animationProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center" ref={containerRef}>
      <div className="relative w-full h-64 md:h-48 mb-12 flex justify-center items-center">
        {testimonials.map((testimonial, index) => {
          const totalChars = testimonial.contentSegments.reduce((acc, seg) => acc + seg.text.length, 0) + 2; // +2 for quotes
          let charCount = 1;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0,
                y: activeIndex === index ? 0 : 20,
                pointerEvents: activeIndex === index ? 'auto' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="absolute text-center max-w-3xl px-4"
            >
              <p className="text-lg md:text-2xl font-normal leading-relaxed mb-8">
                <Char progress={animationProgress} range={[0, 1/totalChars]} targetColor="#ffffff">"</Char>
                {testimonial.contentSegments.map((segment, sIdx) => (
                  <span key={sIdx}>
                    {segment.text.split("").map((char, cIdx) => {
                      const start = charCount / totalChars;
                      const end = (charCount + 1) / totalChars;
                      charCount++;
                      return (
                        <Char 
                          key={cIdx} 
                          progress={animationProgress} 
                          range={[start, end]} 
                          targetColor={segment.color}
                        >
                          {char}
                        </Char>
                      );
                    })}
                  </span>
                ))}
                <Char progress={animationProgress} range={[charCount/totalChars, 1]} targetColor="#ffffff">"</Char>
              </p>
              <div>
                <h4 className="font-medium text-white">{testimonial.name}</h4>
                <p className="text-[#a3a3a3] text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-4">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-full overflow-hidden transition-all duration-300 ${
              activeIndex === index ? 'w-16 h-16 ring-2 ring-[#FF4D2E] ring-offset-4 ring-offset-[#0a0a0a]' : 'w-12 h-12 opacity-50 hover:opacity-100'
            }`}
          >
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  const N = projectsData.length;

  return (
    <section id="projects" ref={containerRef} className="bg-[#0a0a0a] text-white border-t border-white/10 relative" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-8 md:mb-12 z-10">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Selected Projects
          </span>
        </div>
        
        <div className="relative w-full max-w-[1800px] mx-auto h-[75vh] flex items-center justify-center">
          {projectsData.map((project, i) => {
            const isFirst = i === 0;
            const isLast = i === N - 1;

            const startFade = isLast ? 0 : i / (N - 1);
            const endFade = isLast ? 1 : (i + 1) / (N - 1);
            
            const startIn = isFirst ? 0 : (i - 1) / (N - 1);
            const endIn = isFirst ? 1 : i / (N - 1);

            const scale = useTransform(scrollYProgress, [startFade, endFade], [1, 0.9]);
            const opacity = useTransform(scrollYProgress, [startFade, endFade], [1, 0]);
            const y = useTransform(scrollYProgress, [startIn, endIn], ["100%", "0%"]);
            
            return (
              <motion.a
                href={project.link}
                key={project.id}
                style={{ 
                  scale: isLast ? 1 : scale, 
                  opacity: isLast ? 1 : opacity,
                  y: isFirst ? "0%" : y,
                  zIndex: i
                }}
                className="absolute w-[calc(100%-3rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-8rem)] max-w-7xl top-0 bottom-0 cursor-none group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden bg-[#111111] border border-white/10 flex flex-col md:flex-row shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  {/* Left: Image */}
                  <div className="w-full md:w-[60%] h-[50%] md:h-full relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  
                  {/* Right: Content */}
                  <div className="w-full md:w-[40%] h-[50%] md:h-full p-6 md:p-8 lg:p-12 flex flex-col justify-between relative">
                    <div>
                      <p className="text-white/60 font-mono text-xs md:text-sm mb-4">( {project.year} )</p>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight">{project.title}</h3>
                      <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col mt-6 md:mt-8">
                      {project.categories.map((category, idx) => (
                        <div key={idx} className="py-3 border-t border-white/10 text-white/80 text-xs md:text-sm">
                          {category}
                        </div>
                      ))}
                      <div className="border-t border-white/10"></div>
                    </div>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-24 h-24 bg-[#FF4D2E] rounded-full pointer-events-none z-50 flex items-center justify-center text-white font-medium mix-blend-normal"
        animate={{
          x: cursorPos.x - 48,
          y: cursorPos.y - 48,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        View
      </motion.div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section id="process" className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // How it Works
        </span>
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 max-w-3xl">
            We streamline product design<br className="hidden md:block" /> and development workflow
          </h2>
          <p className="text-[#a3a3a3] text-base md:text-lg max-w-2xl">
            Each UI we design closely aligns with your product's intent and business<br className="hidden md:block" /> objectives. We never create without testing — validation is essential.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="flex flex-col gap-24">
            {processSteps.map((step, index) => (
              <div key={step.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch relative group">
                
                {/* Line for this row (and gap) */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-[19px] md:left-[23px] top-[40px] md:top-[48px] bottom-[-6rem] w-[2px] bg-white/10 hidden md:block" />
                )}
                {/* Mobile line */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-[19px] top-[40px] bottom-[-6rem] w-[2px] bg-white/10 md:hidden" />
                )}
                
                {/* Left Side */}
                <div className="flex gap-6 md:gap-8">
                  {/* Number */}
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-xl flex items-center justify-center font-medium text-lg md:text-xl z-10">
                    {step.id}
                  </div>
                  
                  {/* Text */}
                  <div className="pt-1 md:pt-2">
                    <h3 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4">{step.title}</h3>
                    <p className="text-[#a3a3a3] text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                   {step.visual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CalSection = () => {
  return (
    <section id="contact" className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // Book a Consultation
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6">
            Let's discuss your project
          </h2>
          <p className="text-[#a3a3a3] text-lg md:text-xl max-w-2xl mx-auto">
            Schedule a free 30-minute discovery call to discuss your goals, challenges, and how we can work together to create something amazing.
          </p>
        </div>
        <div className="bg-[#111111] rounded-3xl p-4 md:p-8 border border-white/10 relative overflow-hidden">
          <Cal 
            namespace="30min"
            calLink="edmond-moepswa/30min"
            style={{width:"100%",height:"100%",overflow:"scroll"}}
            config={{
              "layout":"month_view",
              "useSlotsViewOnSmallScreen":"true",
              "notes":"Hi Edmond! I'd like to discuss [Website Redesign / New Web App / Branding]. My estimated budget is [Budget] and I'm hoping to launch by [Date].",
              "phone":"+267"
            }}
          />
          {/* Cover Cal.com branding strip */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#111111] z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="relative min-h-screen bg-[#e5e5e5] text-[#1a1a1a] overflow-hidden flex flex-col justify-end p-6 md:p-10 pb-32 md:pb-32">
      {/* Background Portrait (Flipped horizontally) */}
      <img
        src="/01-edmond-portrait.png"
        alt="Edmond Moepswa Portrait"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ transform: 'scaleX(-1)' }}
      />
      {/* Watermark cover — bottom-left because image is flipped */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#e5e5e5] z-[1] pointer-events-none" />

      {/* Scrolling "Reach Out" Text */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none overflow-hidden mix-blend-difference">
        <motion.div
          className="flex whitespace-nowrap text-white font-bold text-[15vw] tracking-tighter cursor-pointer pointer-events-auto"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15,
          }}
          whileHover={{ color: "#FF4D2E", scale: 1.05 }}
        >
          <span className="pr-16">Reach Out</span>
          <span className="pr-16">Reach Out</span>
          <span className="pr-16">Reach Out</span>
          <span className="pr-16">Reach Out</span>
          <span className="pr-16">Reach Out</span>
          <span className="pr-16">Reach Out</span>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end w-full mix-blend-difference text-white gap-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-end mb-12 md:mb-0">
          {/* Social Links */}
          <div className="flex flex-col gap-3 text-sm font-medium">
            <span className="text-[#a3a3a3] text-[10px] uppercase tracking-widest mb-2 opacity-50">Social</span>
            <a href="https://linkedin.com/in/edmond-moepswa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <Linkedin className="w-4 h-4" />
              Linkedin
            </a>
            <a href="https://x.com/edmondmoepswa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <XIcon className="w-4 h-4" />
              X
            </a>
            <a href="https://instagram.com/edmondmoepswa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3 text-sm font-medium">
            <span className="text-[#a3a3a3] text-[10px] uppercase tracking-widest mb-2 opacity-50">Contact</span>
            <a href="https://wa.me/26778692888" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <Phone className="w-4 h-4" />
              +267 78 692 888
            </a>
            <a href="mailto:edmond.moepswa@gmail.com" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <Mail className="w-4 h-4" />
              edmond.moepswa@gmail.com
            </a>
            <div className="flex items-center gap-3 opacity-70">
              <MapPin className="w-4 h-4" />
              Gaborone, Botswana
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3 text-sm font-medium">
            <span className="text-[#a3a3a3] text-[10px] uppercase tracking-widest mb-2 opacity-50">Quick Links</span>
            <Link href="/refund-policy" className="hover:opacity-70 transition-opacity">Refund & Dispute Policy</Link>
            <Link href="/cancellation-policy" className="hover:opacity-70 transition-opacity">Cancellation Policy</Link>
            <Link href="/terms-and-conditions" className="hover:opacity-70 transition-opacity">Terms & Conditions</Link>
            <Link href="/legal-restrictions" className="hover:opacity-70 transition-opacity">Legal Restrictions</Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-sm font-medium">© {new Date().getFullYear()} Edmond Moepswa.</p>
          <p className="text-sm font-medium text-[#a3a3a3]">All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const introRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start 85%", "end 50%"]
  });
  const priceCardsRef = useRef<HTMLDivElement>(null);
  const priceCardsInView = useInView(priceCardsRef, { once: true, margin: "-5% 0px" });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Cal.com
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      // @ts-ignore - hideBranding config operates successfully but isn't typed in the standard UiConfig interface yet
      cal("ui", {"styles":{"branding":{"brandColor":"#FF4D2E"}},"hideEventTypeDetails":false,"layout":"month_view","hideBranding":true});
      
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          fetch("https://hook.eu2.make.com/vu0xdsbf7dysa8auc6j2d6gwnwpbs4qj", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e.detail)
          }).catch(console.error);
        }
      });
    })();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculator State
  const [serviceType, setServiceType] = useState<'development' | 'both'>('both');
  const [pages, setPages] = useState<number>(5);
  const [needContent, setNeedContent] = useState<boolean>(false);
  const [needSEO, setNeedSEO] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<'regular' | 'fast' | 'rush'>('regular');

  // Pricing Logic
  const safePages = Math.max(1, (typeof pages === 'number' && !isNaN(pages) && pages > 0) ? pages : 1);

  const calculatePrice = () => {
    let base = 0;
    let perPage = 0;
    if (serviceType === 'development') {
      base = 199;
      perPage = 100;
    } else {
      base = 499;
      perPage = 200;
    }
    let total = Math.max(base, base + (safePages - 1) * perPage);
    if (needContent) total += safePages * 50;
    if (needSEO) total += safePages * 50;
    if (timeline === 'rush') total += safePages * 100;
    if (timeline === 'fast') total += safePages * 25;
    return total;
  };

  const calculateAgencyCost = () => {
    const perPage = serviceType === 'both' ? 1000 : 400;
    return 8000 + (safePages - 1) * perPage;
  };

  const calculateFreelancerCost = () => {
    const perPage = serviceType === 'both' ? 500 : 200;
    return 3000 + (safePages - 1) * perPage;
  };

  return (
    <TooltipProvider>
      <main className="font-sans bg-[#0a0a0a]">
        {/* Hero Section */}
      <div className="relative min-h-screen bg-[#e5e5e5] text-[#1a1a1a] overflow-hidden flex flex-col justify-between p-6 md:p-10">
      
      {/* Background Portrait */}
      <img 
        src="/01-edmond-portrait.png"
        alt="Edmond Moepswa Portrait"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      {/* Watermark cover — bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#e5e5e5] z-[1] pointer-events-none" />

      {/* Scrolling Name Text */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none overflow-hidden mix-blend-difference">
        <motion.div
          className="flex whitespace-nowrap text-white font-bold text-[15vw] tracking-tighter"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="relative z-50 flex justify-center w-full">
        <nav className="flex w-full max-w-5xl items-center justify-between text-sm md:text-base font-medium text-white p-3 px-6 rounded-full backdrop-blur-xl bg-[#1a1a1a]/40 border border-white/10 shadow-2xl">
          <a href="/" className="px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 font-bold hover:text-[#FF4D2E]">Home</a>
          <a href="#about" className="px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E]">About</a>
          <a href="#projects" className="px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E]">Projects</a>
          <div className="w-[140px] h-[40px]">
            {!isScrolled && (
              <motion.button
                layoutId="bookCallBtn"
                data-cal-namespace="30min"
                data-cal-link="edmond-moepswa/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="w-full h-full bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Call
              </motion.button>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content Area (Bottom aligned) */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end w-full mt-24 mix-blend-difference text-white">
        {/* Social Links */}
        <div className="flex flex-col gap-3 mb-12 md:mb-2">
          <a href="#" className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity">
            <Linkedin className="w-4 h-4" />
            Linkedin
          </a>
          <a href="#" className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity">
            <XIcon className="w-4 h-4" />
            X
          </a>
          <a href="#" className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity">
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        </div>

        {/* Hero Text */}
        <div className="text-right relative">
          <h1 className="text-5xl md:text-7xl lg:text-[110px] font-medium tracking-tighter leading-[1.05]">
            // Web Designer<br />
            & Developer
          </h1>
        </div>
      </div>
    </div>

      {/* Intro Section */}
      <section id="about" className="bg-[#0a0a0a] text-white px-6 md:px-10 py-24 md:py-40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Section Label */}
          <div className="md:col-span-3 lg:col-span-2">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Intro
            </span>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 lg:col-span-10 flex flex-col gap-16 md:gap-24">
            <h2 ref={introRef} className="text-4xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tighter">
              {(() => {
                let charCount = 0;
                return textSegments.map((segment, sIdx) => (
                  <span key={sIdx}>
                    {segment.text.split("").map((char, cIdx) => {
                      const start = charCount / totalChars;
                      const end = (charCount + 1) / totalChars;
                      charCount++;
                      return (
                        <Char 
                          key={cIdx} 
                          progress={introProgress} 
                          range={[start, end]} 
                          targetColor={segment.color}
                        >
                          {char}
                        </Char>
                      );
                    })}
                  </span>
                ));
              })()}
            </h2>

            <div className="flex flex-col md:flex-row justify-end">
              <div className="md:w-2/3 lg:w-1/2 flex flex-col items-start gap-10">
                <p className="text-[#a3a3a3] text-lg md:text-xl leading-relaxed">
                  Bringing your vision to life quickly and efficiently—whether it's branding, apps, or websites—I've got it covered, delivering smooth and effective solutions from start to finish.
                </p>
                <a 
                  href="#work" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
                >
                  See my Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Continuous Scroll */}
      <section id="services" className="bg-[#0a0a0a] text-white border-t border-white/10">
        <div className="max-w-[1800px] w-full mx-auto px-6 md:px-10 py-24 md:py-40 flex flex-col gap-24 md:gap-40">
          {/* Section Label */}
          <div className="shrink-0">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Services
            </span>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            {services.map((service, index) => (
              <ServiceBlock key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Testimonials
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">
              What my clients say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Logo Marquee Section */}
      <LogoMarquee />

      {/* Process Section */}
      <ProcessSection />

      {/* Calculator Section */}
      <section id="calculator-section" className="bg-[#0a0a0a] border-t border-white/10 py-16 md:py-28 px-4 md:px-16 w-full">
        <div className="max-w-[1800px] mx-auto mb-12 md:mb-20">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Project Estimate Calculator
          </span>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6 tracking-tight">
              Get a premium website within your budget
            </h2>
            <p className="text-[#a3a3a3] text-lg leading-relaxed max-w-2xl mx-auto">
              Estimate your project cost instantly. Select your required services and number of pages to see a transparent price breakdown for your next digital venture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden">
          {/* LEFT COLUMN */}
          <div className="bg-[#0D0D0D] p-8 lg:p-12 divide-y divide-[#1E1E1E]">
            {/* Service Type */}
            <div className="pb-8">
              <h3 className="text-white text-lg font-medium mb-6">What kind of service do you need?</h3>
              <div className="space-y-4">
                {[
                  { id: 'development', label: 'Only Development' },
                  { id: 'both', label: 'Design + Development' }
                ].map(option => (
                  <label key={option.id} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${serviceType === option.id ? 'border-[#FF4D2E]' : 'border-white/20 group-hover:border-white/40'}`}>
                      {serviceType === option.id && <div className="w-2 h-2 rounded-full bg-[#FF4D2E]" />}
                    </div>
                    <span className="text-white/90">{option.label}</span>
                    <input 
                      type="radio" 
                      name="serviceType" 
                      className="hidden" 
                      checked={serviceType === option.id}
                      onChange={() => setServiceType(option.id as any)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Pages */}
            <div className="py-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-lg font-medium">Select number of pages:</h3>
                <span className="text-[#FF4D2E] text-xl font-medium"><AnimatedNumber value={safePages} /></span>
              </div>
              <Slider 
                min={1} 
                max={30} 
                step={1} 
                value={[safePages]} 
                onValueChange={(val: any) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  if (typeof v === 'number' && !isNaN(v)) setPages(v);
                }}
                className="mb-4 h-6 [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-range]]:bg-[#FF4D2E] [&_[data-slot=slider-range]]:shadow-[0_0_10px_rgba(255,77,46,0.3)] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-[#FF4D2E] [&_[data-slot=slider-thumb]]:shadow-[0_0_20px_rgba(255,77,46,0.7)] transition-all"
              />
              <div className="flex justify-between text-white/50 text-sm">
                <span>1</span>
                <span>30</span>
              </div>
            </div>

            {/* Add-ons */}
            <div className="py-8">
              <h3 className="text-white text-lg font-medium mb-6">Add-ons:</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${needContent ? 'border-[#FF4D2E] bg-[#FF4D2E]' : 'border-white/20 group-hover:border-white/40'}`}>
                      {needContent && (
                        <motion.svg
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                    <span className="text-white/90">I will need help with content</span>
                  </div>
                  <span className="text-[#FF4D2E]">+P50/pages</span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={needContent}
                    onChange={(e) => setNeedContent(e.target.checked)}
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${needSEO ? 'border-[#FF4D2E] bg-[#FF4D2E]' : 'border-white/20 group-hover:border-white/40'}`}>
                      {needSEO && (
                        <motion.svg
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                    <span className="text-white/90">I want to optimise my website for SEO</span>
                  </div>
                  <span className="text-[#FF4D2E]">+P50/pages</span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={needSEO}
                    onChange={(e) => setNeedSEO(e.target.checked)}
                  />
                </label>
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-8">
              <h3 className="text-white text-lg font-medium mb-6">How fast do you need this?</h3>
              <div className="space-y-4">
                {[
                  { id: 'rush', label: 'Within 7 Days', price: '+P100/pages' },
                  { id: 'fast', label: 'Within 14 Days', price: '+P25/pages' },
                  { id: 'regular', label: 'Regular Speed (Based on discussion)', price: '' }
                ].map(option => (
                  <label key={option.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${timeline === option.id ? 'border-[#FF4D2E]' : 'border-white/20 group-hover:border-white/40'}`}>
                        {timeline === option.id && <div className="w-2 h-2 rounded-full bg-[#FF4D2E]" />}
                      </div>
                      <span className="text-white/90">{option.label}</span>
                    </div>
                    {option.price && <span className="text-[#FF4D2E]">{option.price}</span>}
                    <input 
                      type="radio" 
                      name="timeline" 
                      className="hidden" 
                      checked={timeline === option.id}
                      onChange={() => setTimeline(option.id as any)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-[#111111] p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-[#1E1E1E] flex flex-col">
            <h3 className="text-white text-2xl font-medium mb-2">Estimated Cost</h3>
            <p className="text-[#a3a3a3] text-sm mb-8">
              This is an instant estimation to give you an idea how much you can save with us.
            </p>

            <div ref={priceCardsRef} className="space-y-4 flex-1 flex flex-col justify-center">
              {/* Agency Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={priceCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="bg-[#1A1A1A] rounded-2xl p-6 space-y-3 border border-white/5"
              >
                <h4 className="text-white/90 font-medium">Typical Agency charges minimum</h4>
                <div className="text-4xl font-bold text-white">P<AnimatedNumber value={calculateAgencyCost()} /></div>
                <p className="text-[#a3a3a3] text-sm">+ Too much extra time & additional cost</p>
              </motion.div>

              {/* Freelancer Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={priceCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="bg-[#1A1A1A] rounded-2xl p-6 space-y-3 border border-white/5"
              >
                <h4 className="text-white/90 font-medium">Regular Freelancer charges minimum</h4>
                <div className="text-4xl font-bold text-white">P<AnimatedNumber value={calculateFreelancerCost()} /></div>
                <p className="text-[#a3a3a3] text-sm">+ Too much headache & back-and-forth</p>
              </motion.div>

              {/* Your Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={priceCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="bg-gradient-to-br from-[#FF4D2E] to-[#FF7A00] rounded-2xl p-6 space-y-3 text-white shadow-xl shadow-[#FF4D2E]/20 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={priceCardsInView ? { opacity: [0, 0.2, 0] } : {}}
                  transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
                />
                <h4 className="font-medium text-white/90">With Edmond Moepswa</h4>
                <div className="text-5xl font-bold">P<AnimatedNumber value={calculatePrice()} /></div>
                <p className="text-white/90 text-sm">Save your money, time & headache</p>
              </motion.div>
            </div>

            <button 
              data-cal-namespace="30min"
              data-cal-link="edmond-moepswa/30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="mt-8 w-full py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
              Book a Call
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Cal.com Section */}
      <CalSection />

      <section className="bg-[#0a0a0a] py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <div className="mb-14">
            <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em]">// Free Resources</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-6 tracking-tight">Download free guides</h2>
            <p className="text-[#a3a3a3] mt-6 max-w-xl text-lg leading-relaxed mx-auto md:mx-0">Practical resources to help you build a better digital presence. Completely free — no strings attached.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "5 Signs Your Website Is Costing You Clients",
                desc: "Discover the 5 most common website mistakes that silently drive potential clients away — and how to fix them fast.",
                icon: "📉",
                tag: "PDF Guide",
                url: "https://edmnd.gumroad.com/l/bgbgoq"
              },
              {
                title: "Website Launch Checklist",
                desc: "A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.",
                icon: "✅",
                tag: "Checklist",
                url: "https://edmnd.gumroad.com/l/fwruno"
              },
              {
                title: "How to Brief a Web Designer",
                desc: "Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.",
                icon: "📝",
                tag: "E-book",
                url: "https://edmnd.gumroad.com/l/legyuk"
              }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 hover:border-[#FF4D2E]/40 transition-all duration-300 group cursor-pointer flex flex-col shadow-2xl"
              >
                <span className="text-4xl mb-6">{item.icon}</span>
                <span className="text-[#FF4D2E] text-[10px] font-bold uppercase tracking-[0.15em] mb-3">{item.tag} · Free</span>
                <h3 className="text-white font-medium text-xl mb-4 leading-tight group-hover:text-[#FF4D2E] transition-colors">{item.title}</h3>
                <p className="text-[#a3a3a3] text-sm flex-1 leading-relaxed">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[#FF4D2E] text-sm font-bold group-hover:gap-3 transition-all">
                  Download Free <span className="text-lg">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Substack Feed */}
      <SubstackFeed />



      {/* Footer */}
      <Footer />


      {/* Fixed floating buttons */}
      <AnimatePresence>
        {isScrolled && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-[#FF4D2E] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#FF4D2E]/20 hover:bg-[#e03a1f] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 z-50 flex items-center gap-3 drop-shadow-2xl"
            >
              <button
                data-cal-namespace="30min"
                data-cal-link="edmond-moepswa/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="px-6 py-4 bg-[#FF4D2E] text-white rounded-full font-medium text-base hover:bg-[#e03a1f] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D2E]/30"
              >
                <Calendar className="w-5 h-5" />
                Book Call
              </button>

              <motion.a
                href="https://wa.me/26778692888?text=Hi%20Edmond,%20I'm%20interested%20in%20working%20with%20you..."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toast.success("Opening WhatsApp...")}
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#20bd5a] transition-colors cursor-pointer shadow-lg shadow-[#25D366]/30"
              >
                <WhatsAppIcon className="w-7 h-7" />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Toaster position="bottom-right" theme="dark" />
    </main>
    </TooltipProvider>
  );
}
