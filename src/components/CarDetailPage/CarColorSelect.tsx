"use client";

interface Props {
  colors: {
    id: number;
    name: string;
    code: string;
    image: string;
  }[];
  selected: string;
  onChange: (color: string) => void;
}

export default function CarColorSelect({ colors, selected, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 🔹 สีจาก DB */}
      {colors.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.code)}
          className={`rounded-lg overflow-hidden border-2 transition
            ${selected === c.code ? "border-black scale-105" : "border-gray-200"}
          `}
        >
          <img
            src={c.image}
            alt={c.name}
            className="w-full h-24 object-cover"
          />
        </button>
      ))}

      {/* 🌈 Custom */}
      <div className="relative w-full h-24">
        <div
          className="absolute inset-0 rounded-lg border-2 border-gray-200
                     bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
        />
        <input
          type="color"
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
