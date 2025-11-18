import express from "express";
import cors from "cors"; // ✅ Import CORS
import connectDB from "./config/database";
import blogRoutes from "./routes/blogRoutes";
import { logger } from "./middleware/logger";
import { apiLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:3000" }));

connectDB();

app.use(express.json());
app.use(logger);
app.use("/api", apiLimiter);

// Routes
app.use(blogRoutes);

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
