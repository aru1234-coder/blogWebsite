// app/auth/layout.js
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  console.log("layout 2");
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
