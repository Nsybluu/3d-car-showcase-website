"use client";
// Components
import Container from "@/src/components/Main/Container";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-300">
      <div className="py-12">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col text-md font-normal mb-6 md:mb-0">
              <span>LoveCodeLoveCar</span>
              <span>3D Car Showcase</span>
              <span>Academic Project</span>
              <span>SSRU - CSD3102</span>
            </div>

            <div className="flex gap-6 text-black">
              <FaFacebookF
                href="https://www.facebook.com/nisssyy0"
                target="_blank"
                className="hover:text-black/20 cursor-pointer"
              />
              <FaInstagram
                href="https://www.instagram.com/moss.nsyy"
                target="_blank"
                className="hover:text-black/20 cursor-pointer"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-gray-300 py-4 text-sm text-gray-600">
        <Container>
          © {new Date().getFullYear()} LoveCodeLoveCar. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
