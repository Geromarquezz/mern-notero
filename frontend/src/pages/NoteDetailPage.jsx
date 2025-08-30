import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note:", error);
        toast.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  console.log(note);
  const handleDelete = async () => {
    if (!window.confirm("¿Está seguro de que desea eliminar esta nota?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Nota eliminada con éxito");
      navigate("/");
    } catch (error) {
      console.log("Error eliminando nota:", error);
      toast.error("Error eliminando nota");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Título y contenido son requeridos");
      return;
    }
    if (!window.confirm("Esta seguro que desea guardar los cambios?")) return;
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Nota actualizada con éxito");
      navigate("/");
    } catch (error) {
      console.log("Error updating note:", error);
      toast.error("Error actualizando nota");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">

            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Atras
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Eliminar
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md max-w-2xl mx-auto">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Título</span>
              </label>
              <input
                type="text"
                placeholder="Ingrese el título de la nota"
                className="input input-bordered"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>
            <div className="form-control mb-4">

              <label className="label">
                <span className="label-text">Contenido</span>
              </label>
              <textarea
                placeholder="Ingrese el contenido de la nota"
                className="textarea textarea-bordered"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NoteDetailPage;