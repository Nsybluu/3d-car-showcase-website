/**
 * Shared GlassCard component — ใช้ร่วมระหว่าง About / Contact pages
 * แทนที่ copy-paste ระหว่าง 2 ไฟล์
 */
interface GlassCardProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function GlassCard({ children, dark = false }: GlassCardProps) {
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
