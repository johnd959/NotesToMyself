import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";
import { NoteContextProvider } from "./_utils/note-context.js";
import { FolderContextProvider } from "./_utils/folder-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes to Myself",
  description: "Just a notes app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content={"width=device-width, initial-scale=1 " + (navigator.userAgent.indexOf('iPhone') > -1)? "maximum-scale=1" : ""}
      ></meta>
      <body>
        <AuthContextProvider>
          <FolderContextProvider>
            <NoteContextProvider>{children}</NoteContextProvider>
          </FolderContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
