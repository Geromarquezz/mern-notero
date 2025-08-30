import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

//Middleware (hacer algo antes de que el servidor devuelva una respuesta)

// parsea los json bodies
app.use(express.json()); 

// Middleware para loguear las peticiones
app.use(cors({ origin: 'http://localhost:5173' }));

app.use((req,res,next) => {
  console.log(`Se uso el metodo ${req.method} en ${req.url}`);
  next();
});

app.use(rateLimiter);
//Permite acceder a cualquier request de cualquier API que exista sin el error de CORS

//Route note
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// mongodb+srv://geritomarque_db_user:iEX7HWTmqaaLC3ZM@cluster0.7xe7qq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0