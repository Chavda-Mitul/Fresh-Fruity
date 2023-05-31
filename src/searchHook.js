import { useState } from "react";

export function searchHook() {
  const [query, setQuery] = useState("");

  return { query, setQuery };
}
