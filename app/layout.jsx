import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContext from "@/components/authentication/AuthProvider";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/components/user/UserContext";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

async function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthContext>
          <UserProvider>
            <Navbar />
            <main className="flex flex-col min-h-[calc(100vh-14.5rem)]  md:min-h-[calc(100vh-8rem)]">
              {children}
            </main>
            <Footer />
            <Toaster
              position="bottom-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: { duration: 5000 },
                error: { duration: 5000 },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "white",
                  color: "gray",
                },
              }}
            />
          </UserProvider>
        </AuthContext>
      </body>
    </html>
  );
}

export default MainLayout;
