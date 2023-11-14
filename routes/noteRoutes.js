const express = require("express");
const router = express.Router();
const noteHandler = require("../handler/noteHandler");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, noteHandler.create);
router.get("/", authMiddleware, noteHandler.list);
router.get("/:id", authMiddleware, noteHandler.getById); 
router.put("/:id", authMiddleware, noteHandler.update);
router.delete("/:id", authMiddleware, noteHandler.delete);

module.exports = router;
