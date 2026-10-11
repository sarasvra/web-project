import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";



const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Nell clayArt",
  description: "online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="fa" dir="rtl">
    <body className={`overflow-x-clip ${vazirmatn.className}`}>
          <AuthProvider> 
              <CartProvider>{children} </CartProvider>
          </AuthProvider>

      </body>
  </html>
);
}
