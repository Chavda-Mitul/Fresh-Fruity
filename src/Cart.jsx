import React, { useState } from "react";
import SummaryPage from "./SummaryPage";
function Cart({ selectedItems, setSelectedItems }) {
  return (
    <>
      <SummaryPage
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
}

export default Cart;
