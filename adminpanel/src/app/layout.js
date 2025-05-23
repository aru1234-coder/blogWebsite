// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "../redux/provider"; // adjust path if needed

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Panel",
  description: "Admin panel for managing blog content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster />
          <div className="flex h-screen">
            <div className="flex-1 flex flex-col bg-gray-100">
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
