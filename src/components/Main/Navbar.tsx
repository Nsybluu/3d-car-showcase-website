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
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex gap-12 px-20 py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg relative"
      >
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.href)}
              className={`
                relative text-md font-semibold px-2 py-1 tracking-wide uppercase
                transition-colors duration-300
                ${active ? "text-black" : "text-black/40 hover:text-black"}
              `}
            >
              {item.name}

              {active && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-black rounded-full"
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
      </motion.div>
    </nav>
  );
}
