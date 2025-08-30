import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Título y contenido son requeridos");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { 
        title, content 
      });
      toast.success("Nota creada con éxito");
      navigate("/");
    } catch (error) {
      console.log("Error creando nota:", error);
      toast.error("Error creando nota");

    } finally {
      setLoading(false);
    }
};

  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div>
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Atras
        </Link>
        <div className="bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              Crear una Nueva Nota
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Título</span>
                </label>
                <input type="text" placeholder="Ingrese el título de la nota" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Contenido</span>
                </label>
                <textarea placeholder="Ingrese el contenido de la nota" className="textarea textarea-bordered" value={content} onChange={(e) => setContent(e.target.value)} />
              </div>

              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creando..." : "Crear Nota"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>;
}

export default CreatePage;