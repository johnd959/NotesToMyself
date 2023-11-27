import Image from 'next/image'
import NoteViewer from './components/UI/NoteViewer'
import { Note } from './Types/Note'

export default function Home() {

  const notes : Note[] = [
    {
        id: "1234",
        title: "Buy dog food",
        content: "Buy 2 bags of dog food from Superstore",
        date: "Today"
    }
]


  return (
    <main className="flex min-h-screen min-w-full flex-col justify-center items-center bg-blue-50">
      <NoteViewer note={notes[0]}></NoteViewer>
    </main>
  )
}
