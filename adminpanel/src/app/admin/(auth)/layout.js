// app/auth/layout.js
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
