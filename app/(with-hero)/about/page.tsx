import Container from "@/src/components/Main/Container";
import AboutContainer from "@/src/components/AboutPage/AboutContainer";
import Image from "next/image";

export const metadata = {
  title: "About | LoveCodeLoveCar",
};

export default function AboutPage() {
  return (
    <section className="py-20">
      <AboutContainer />
    </section>
  );
}
