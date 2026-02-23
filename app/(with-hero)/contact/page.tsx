import React from "react";
import ContactContainer from "@/src/components/ContactPage/ContactContainer";
import Container from "@/src/components/Main/Container";

export const metadata = {
  title: "Contact | LoveCodeLoveCar",
};

const Contact = () => {
  return (
    <section className="py-20">
      <ContactContainer />
    </section>
  );
};

export default Contact;
