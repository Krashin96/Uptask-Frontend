import { Task } from "~/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetails from "./NoteDetails";

export default function NotesPanel({ notes }: { notes: Task['notes'] }) {
    return (
        <>
            <AddNoteForm />

            <section className="divide-y divide-gray-100 my-5">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p>
                        {
                            notes.map(note => <NoteDetails key={note._id} note={note} />)
                        }
                    </>
                ) : <p className="text-gray-500 text-center pt-3">No hay Notas</p>}
            </section>
        </>
    )
}
