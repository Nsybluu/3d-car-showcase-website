"use client";

import Container from "../Main/Container";

import Image from "next/image";
import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiThreedotjs,
} from "react-icons/si";

// Icon Component
function TechIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        w-12 h-12 flex items-center justify-center
        rounded-xl
        bg-white/10 backdrop-blur-lg
        border border-white/15
        shadow-md
        transition duration-300
        hover:scale-110 hover:bg-white/20
      "
    >
      {children}
    </div>
  );
}

// Glass Card Component
function GlassCard({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`
        relative rounded-3xl p-8
        bg-white/10 backdrop-blur-xs
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        transition duration-300

        before:content-['']
        before:absolute before:inset-0
        before:rounded-3xl
        before:border before:border-white/20
        before:pointer-events-none

        ${dark ? "bg-black/30 text-white" : "bg-white/10 text-white"}
    `}
    >
      {children}
    </div>
  );
}

export default function AboutContainer() {
  return (
    <Container>
      <section className="relative w-full min-h-screen overflow-hidden rounded-3xl">
        {/* Background Image */}
        <Image
          src="/images/AboutImg.png"
          alt="About Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay (ช่วยให้ text อ่านง่ายขึ้น) */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Wrapper */}
        <div className="relative z-10 px-8 py-15 space-y-24">
          {/* Card 1 - Top Left */}
          <div className="max-w-2xl">
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-4">LoveCodeLoveCar</h2>
              <p>
                LoveCodeLoveCar is a 3D car showcase website designed to present
                cars in an interactive and immersive way. The platform allows
                users to explore car models in 3D and discover key details
                through a clean and modern interface.
              </p>
            </GlassCard>
          </div>

          {/* Card 2 - Right */}
          <div className="flex justify-end">
            <div className="max-w-xl">
              <GlassCard>
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p>
                  Our goal is to create a modern and immersive browsing
                  experience that goes beyond traditional car images.
                </p>
              </GlassCard>
            </div>
          </div>

          {/* Card 3 - Left */}
          <div className="max-w-xl">
            <GlassCard dark>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Interactive 3D car viewer</li>
                <li>Brand & category filtering</li>
                <li>Modern minimal UI</li>
              </ul>
            </GlassCard>
          </div>

          {/* Card 4 - Bottom Right */}
          <div className="flex justify-end">
            <div className="max-w-xl">
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>

                <ul className="list-disc pl-5 space-y-2 mb-6">
                  <li>React</li>
                  <li>NextJS</li>
                  <li>Three.js / React Three Fiber</li>
                  <li>Tailwind CSS</li>
                  <li>MySQL</li>
                </ul>

                {/* 🔥 Icon Row */}
                <div className="flex gap-4">
                  <TechIcon>
                    <FaReact size={26} />
                  </TechIcon>

                  <TechIcon>
                    <SiNextdotjs size={26} />
                  </TechIcon>

                  <TechIcon>
                    <SiThreedotjs size={26} />
                  </TechIcon>

                  <TechIcon>
                    <SiTailwindcss size={26} />
                  </TechIcon>

                  <TechIcon>
                    <SiMysql size={26} />
                  </TechIcon>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
