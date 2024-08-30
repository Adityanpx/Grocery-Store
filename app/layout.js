"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <html lang="en">
      <body className={outfit.className}>
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <Header />
          {children}
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
