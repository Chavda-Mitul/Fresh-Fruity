import { useState } from "react";

export function cartHook() {
  const [items, setItems] = useState(0);

  return { items, setItems };
}
