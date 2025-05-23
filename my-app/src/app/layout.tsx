import type { Metadata } from "next";
import React from 'react';
import { ThemeProvider } from "@/src/providers/theme-provider";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "../providers/modal-provider";
import { Toaster } from "@/components/ui/sonner"
import Billing from "./(main)/(pages)/billing/page";
import { BillingProvider } from "../providers/billing-provider";
const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowSync",
  description: "Automate Your Work with FlowSync",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BillingProvider>
              <ModalProvider>
                {children}
                <Toaster />
              </ModalProvider>
            </BillingProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
