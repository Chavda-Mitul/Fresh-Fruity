import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedItems } from "./features/cartItems/itemSlice";
export default function SummaryPage() {
  const navigate = useNavigate();
  const [Quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.value);
  var Total = 0;
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const addItemQuantity = (item) => {
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.id === item.id) {
        // Item found, create a new object with updated quantity
        return {
          ...selectedItem,
          quantity: selectedItem.quantity + 1,
        };
      }
      // Item not found, return the original object
      return selectedItem;
    });

    setQuantity(item.quantity + 1);
    dispatch(setSelectedItems(updatedItems));
  };

  const subItemQuantity = (item) => {
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.id === item.id) {
        // Item found, create a new object with updated quantity
        return {
          ...selectedItem,
          quantity: selectedItem.quantity - 1,
        };
      }
      // Item not found, return the original object
      return selectedItem;
    });

    setQuantity(item.quantity - 1);
    dispatch(setSelectedItems(updatedItems));
    if (item.quantity <= 1) {
      removeItem(item.id);
    }
  };

  const removeItem = (itemId) => {
    dispatch(
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
    );
  };

  const calulateTotal = () => {
    if (selectedItems.length > 0)
      Total = selectedItems.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
    console.log(Total);
  };
  calulateTotal();

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            {Total <= 0 ? (
              <div className="h-full m-auto p-32 text-center">
                <div className="text-4xl font-bold text-center">
                  Purchase something
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">{Total}</h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Total
                  </h3>
                </div>

                {selectedItems.map((item, index) => (
                  <div
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    key={index}
                  >
                    <div className="flex w-2/5">
                      {/* <!-- product --> */}
                      <div className="w-16">
                        <img
                          className="h-24"
                          src={"https://nextui.org" + item.img}
                          alt=""
                        ></img>
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.title}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button
                        onClick={() => subItemQuantity(item)}
                        className="text-gray-600 bg-blue-200 hover:bg-blue-500 hover:text-white hover:border-transparent rounded-l-2xl"
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>

                      <input
                        onChange={handleQuantityChange}
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={item.quantity}
                      ></input>
                      <button
                        onClick={() => addItemQuantity(item)}
                        className="text-gray-600 bg-blue-100 hover:bg-blue-500 hover:text-white hover:border-transparent rounded-r-3xl"
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {item.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
