import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full m-0">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default MainLayout;
