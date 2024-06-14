import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContext from "@/components/authentication/AuthProvider";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/components/user/UserContext";
import { getMessagesCount } from "../lib/actions/message-actions";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

async function MainLayout({ children }) {
  const msgCount = await getMessagesCount();

  return (
    <html lang="en">
      <body className="">
        <AuthContext>
          <UserProvider msgCountProp={msgCount}>
            <Navbar />
            <main>{children}</main>
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
