// app/auth/layout.js
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100">
          <Header />
          <MantineProvider>
            <div className="flex-1 p-4 overflow-auto">{children}</div>
          </MantineProvider>
          <Footer />
        </div>
      </div>
      <Toaster />
    </>
  );
}
