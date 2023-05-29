import { useState } from 'react';
 
export function selectedItemsHook() {
  const [selectedItems, setSelectedItems] = useState([]); 

  return { selectedItems, setSelectedItems };
}
