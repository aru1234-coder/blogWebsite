// src/redux/provider.js
"use client"; // ✅ Important for using hooks

import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
