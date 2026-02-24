"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
  carName: string;
}

export default function CarDetailHeader({ carName }: Props) {
  const router = useRouter();

  return (
    <div className="w-full border-b border-gray-200 pt-30 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-20">
        {/* Back */}
        <Link
          href="/car"
          className="flex items-center gap-2 text-black hover:text-black/20 transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-tight">{carName}</h1>
      </div>
    </div>
  );
}
