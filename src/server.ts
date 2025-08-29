import express, { Request, Response } from "express";
import { items } from "./data/items";
import { Item } from "./models/item";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to My-Shopping List Application Programming interface" });
});

app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

app.get("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/items", (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
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

app.put("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) return res.status(404).json({ error: "Item not found" });

  const { name, quantity, purchased } = req.body;
  if (name !== undefined) item.name = name;
  if (quantity !== undefined) item.quantity = quantity;
  if (purchased !== undefined) item.purchased = purchased;

  res.json(item);
});

app.delete("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
