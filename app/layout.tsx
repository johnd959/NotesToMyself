import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/UI/NotesScroll';
import {AuthContextProvider} from './_utils/auth-context';
import {NoteContextProvider} from './_utils/note-context.js'
import { FolderContextProvider } from './_utils/folder-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notes to Myself',
  description: 'Never forget again!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body>
        <AuthContextProvider>
          <FolderContextProvider>
          <NoteContextProvider>
              {children}
          </NoteContextProvider>            
          </FolderContextProvider>
        </AuthContextProvider>
        </body>
    </html>
  )
}
