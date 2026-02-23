import Navbar from "@/src/components/Main/Navbar";
import Footer from "@/src/components/Main/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 antialiased" style={{ fontFamily: "var(--font-sans)" }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
