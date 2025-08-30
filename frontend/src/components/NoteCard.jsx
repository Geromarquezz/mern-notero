import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formateDate } from '../lib/utils'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();
    // Call the API to delete the note
    if(!window.confirm("¿Está seguro de que desea eliminar esta nota?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Nota eliminada con éxito");
    } catch (error) {
      console.log("Error eliminando nota:", error);
      toast.error("Error eliminando nota");
    }
  };
  return (
    <Link to={`/notes/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#7480FF]">
      <div className="card-body" >
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="card-text text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formateDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
                <PenSquareIcon className="size-4 text-base-content/60" />
                <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2Icon className="size-4" />
                </button>
            </div>

        </div>

      </div>
    </Link>
  )
}

export default NoteCard;