"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Car", href: "/car" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    if (pathname === href) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  return (
    <nav className="fixed top-6 left-0 w-full flex justify-center z-50">
      <div className="flex gap-12 px-20 py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg relative">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.href)}
              className={`
                relative text-lg font-medium px-1
                transition-colors duration-300
                ${active ? "text-black" : "text-black/70 hover:text-black/20"}
              `}
            >
              {item.name}

              {active && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-black"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
