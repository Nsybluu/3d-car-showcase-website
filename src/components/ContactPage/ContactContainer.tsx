"use client";

import Image from "next/image";
import { FaGithub, FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";

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

function SocialIcon({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-16 h-16 flex items-center justify-center
        rounded-xl
        bg-white/10 backdrop-blur-lg
        border border-white/15
        shadow-md
        transition duration-300
        hover:scale-110 hover:bg-white/20
      "
    >
      {children}
    </a>
  );
}

export default function ContactContainer() {
  return (
    <section className="relative w-[843px] h-[1499px] overflow-hidden rounded-3xl mx-auto flex flex-col">
      {/* Background Image */}
      <Image
        src="/images/ContactImg.png"
        alt="Contact Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 p-10 flex flex-col h-full">
        {/* 🔹 ส่วนบน (2 ก้อนแรก) */}
        <div className="space-y-10">
          <GlassCard>
            <h2 className="text-2xl font-semibold">
              Get in touch with LoveCodeLoveCar
            </h2>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-semibold mb-4">Owner Information</h3>
            <div className="space-y-2 text-lg">
              <ul className="list-disc pl-5 space-y-2">
                <li>Project Name: 3D Car Showcase Website</li>
                <li>Developer: MosLoveCode</li>
                <li>Email: s66122250088@ssru.ac.th</li>
              </ul>
            </div>
          </GlassCard>
        </div>

        {/* 🔥 ดันลงล่างสุด */}
        <div className="mt-auto">
          <GlassCard>
            <h3 className="text-xl font-semibold mb-6">Contact Method</h3>

            <div className="flex justify-center gap-10 text-4xl pt-5">
              <SocialIcon href="https://github.com/Nsybluu">
                <FaGithub />
              </SocialIcon>

              <SocialIcon href="mailto:s66122250088@ssru.ac.th">
                <FaGoogle />
              </SocialIcon>

              <SocialIcon href="https://www.facebook.com/nisssyy0">
                <FaFacebookF />
              </SocialIcon>

              <SocialIcon href="https://www.instagram.com/moss.nsyy">
                <FaInstagram />
              </SocialIcon>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
