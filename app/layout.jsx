import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContext from "@/components/AuthProvider";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthContext>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}

export default MainLayout;
