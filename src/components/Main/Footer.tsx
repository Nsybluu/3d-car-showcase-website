"use client";
// Components
import Container from "@/src/components/Main/Container";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Suspense } from "react";

function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-300">
      <div className="py-12">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col text-md font-normal mb-6 md:mb-0">
              <span className="font-semibold text-lg">LoveCodeLoveCar</span>
              <span className="text-gray-500">3D Car Showcase</span>
              <span className="text-gray-500">Academic Project</span>
              <span className="text-gray-500">SSRU - CSD3102</span>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/nisssyy0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/moss.nsyy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-gray-300 py-4 text-sm text-gray-500">
        <Container>
          <p className="text-center">© <Suspense fallback="">{<CopyrightYear />}</Suspense> LoveCodeLoveCar. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
