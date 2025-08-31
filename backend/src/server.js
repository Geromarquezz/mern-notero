import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;
const __dirname = path.resolve();

//Middleware (hacer algo antes de que el servidor devuelva una respuesta)

// parsea los json bodies
app.use(express.json()); 

// Middleware para loguear las peticiones
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(rateLimiter);
//Permite acceder a cualquier request de cualquier API que exista sin el error de CORS

//Route note
app.use("/api/notes", notesRoutes);

//Otro middleware 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// mongodb+srv://geritomarque_db_user:iEX7HWTmqaaLC3ZM@cluster0.7xe7qq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0