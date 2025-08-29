// routes/timezoneRoutes.mjs

import express from "express";
const router = express.Router();

router.get("/timezones", async (req, res) => {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone");
    const zonas = await response.json();
    res.json(zonas);
  } catch (error) {
    console.error("Error obteniendo zonas horarias:", error.message);
    res.status(500).json({ mensaje: "Error obteniendo zonas horarias" });
  }
});

export default router;
