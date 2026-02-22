"use client";

import { LiaCarSideSolid } from "react-icons/lia";

interface Props {
  specs: {
    sectionId: number;
    title: string;
    items: { label: string; value: string }[];
  }[];
}

export default function CarSpecSection({ specs }: Props) {
  // ถ้าไม่มีข้อมูล
  if (!specs || specs.length === 0) {
    return (
      <div className="mt-20 bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>

        <div className="py-16 text-gray-400 flex flex-col items-center gap-4">
          <div className="text-6xl mb-6">
            <LiaCarSideSolid size={100} />
          </div>
          <p>รถรุ่นนี้ยังไม่มีข้อมูล</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-white rounded-2xl p-12 shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-10">Specifications</h2>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-16 gap-y-10">
        {specs.map((section) => (
          <div key={section.sectionId}>
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>

            <ul className="space-y-2 text-gray-700">
              {section.items.map((item, i) => (
                <li key={i}>
                  • <span className="font-medium">{item.label}:</span>{" "}
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
