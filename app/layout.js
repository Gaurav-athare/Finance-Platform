import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "sonner";

export const metadata = {
  title: "Welth",
  description: "Finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased min-h-screen flex flex-col bg-white text-black font-sans">
          {/* HEADER */}
          <Header />
          <main className="flex-grow min-h-[1250px]">{children}</main>
          <Toaster richColors />
          {/* FOOTER */}
          <footer className="bg-blue-100 h-[150px] text-blue-900 p-4 text-center mt-[12px]">
            <p className="text-lg font-bold">Welth Finance Platform</p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Welth. All rights reserved.
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
