import express, { Request, Response } from "express";
import { items } from "./data/items";
import { Item } from "./models/item";

const app = express();
const PORT = 3000;

app.use(express.json());

// ✅ Get all items
app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

// ✅ Add new item
app.post("/items", (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  // Validation
  if (!name || !quantity) {
    return res.status(400).json({ error: "Name and quantity are required" });
  }

  const newItem: Item = {
    id: items.length + 1,
    name,
    quantity,
    purchased: false,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
