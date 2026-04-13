import React, { useState } from "react";
import { CartProvider, useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // checkout form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // maximum digit for mobile number is 10
  const handleMobileChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10); // limit to 10 digits
    setMobile(digitsOnly);
  };

  // check form is filled or not by the user
  const isFormValid = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !mobile.trim() ||
      !paymentMethod.trim()
    ) {
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{10}$/.test(mobile.replace(/\s+/g, "")); // STRICT 10 digits
    return emailOk && phoneOk;
  };

  //payment method
  const processPayment = (method) => {
    if (method === "Cash on Delivery") return true;
    if (method === "Online") {
      return Math.random() < 0.75;
    }
    return false;
  };

  //to submit the data to the and clear the cart
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all required fields correctly.", {
        position: "top-right",
      });
      return;
    }

    if (!cart.length) {
      toast.error("Your cart is empty.", { position: "top-right" });
      return;
    }

    const paymentOk = processPayment(paymentMethod);

    if (paymentOk) {
      clearCart();

      //reset these fields
      setName("");
      setEmail("");
      setAddress("");
      setMobile("");
      setNote("");
      setPaymentMethod("");

      toast.success("Payment successful — order completed.", {
        position: "top-right",
      });
      return;
    } else {
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
      });
      return;
    }
  };

  //if cart is empty
  if (!cart.length) {
    return (
      <>
        <ToastContainer />
        <div className={"min-h-screen bg-gray-50 flex items-center justify-center p-6"}>
          <div className={"max-w-md text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-200"}>
            <ShoppingBag size={48} className={"mx-auto text-gray-400 mb-4"} />
            <h2 className={"text-2xl font-semibold mb-4 text-gray-800"}>
              Your cart is empty
            </h2>
            <p className={"text-gray-600 mb-6"}>
              Looks like you haven't added any watches to your Cart yet.
            </p>
            <Link to="/watches" className={"px-6 py-3 font-semibold text-black bg-gradient-to-br from-gray-200 to-gray-400 rounded-full transition-all inline-block"}>
              Browse Watches
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className={"min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-10"}>
        <div className={"max-w-6xl mx-auto"}>
          <div className={"flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8"}>
            <div className={"flex items-center gap-2 text-gray-800 mb-4 sm:mb-0"}>
              <Link to="/watches" className={"flex items-center gap-2 text-gray-800 cursor-pointer transition-colors"}>
                <div className={"p-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-md transition-all"}>
                  <ArrowLeft size={20} />
                </div>
                <span className={"font-medium"}>Back to Watches</span>
              </Link>
            </div>
            <h1 className={"text-3xl xl:pt-20 xl:ml-65 ml-5 pt-5 md:ml-15 md:pt-20 lg:ml-50 font-[pacifico] font-bold text-gray-700"}>Your Shopping Cart</h1>
            <button
              onClick={clearCart}
              className={"mt-4 sm:mt-0 sm:ml-auto text-red-500 cursor-pointer flex items-center gap-1"}
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>

          <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8"}>
            <div className={"lg:col-span-2 space-y-6 order-1"}>
              <div className={"bg-white font-[pacifico] rounded-xl shadow-md p-6"}>
                <h2 className={"text-xl font-semibold mb-4 text-gray-800"}>Enter Your details</h2>
                <p className={"text-sm text-gray-500 mb-4"}>
                  All fields are required
                </p>

                <form onSubmit={handleSubmit} className={"space-y-4"}>
                  <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="FullName"
                      className={"w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"}
                      required
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={"w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Mobile Number (10 digits)"
                    className={"w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"}
                    required
                  />

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    rows={3}
                    className={"w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150 resize-y"}
                    required
                  ></textarea>

                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={"w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"}
                    required
                  >
                    <option value="">Select Payment method</option>
                    <option value="Online">Online</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>

                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Massage / delivery instructions"
                    rows={2}
                    className={"w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150 resize-y"}
                    required
                  ></textarea>

                  <div className={"flex flex-col sm:flex-row gap-3"}>
                    <button
                      type="submit"
                      className={"flex-1 bg-gradient-to-r from-gray-300 to-gray-500 text-white py-3 rounded-full cursor-pointer transition-colors"}
                    >
                      Submit Oder
                    </button>

                    <Link
                      to="/"
                      className={"px-6 py-3 border border-gray-500 text-black rounded-full transition-all text-center"}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </form>
              </div>

              {/* Cart Items */}
              <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
                {cart.map((item) => (
                  <div key={item.id} className={"bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"}>
                    <div className={"relative h-48 overflow-hidden flex items-center justify-center p-4"}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className={"h-full w-full object-contain transition-transform duration-500"}
                      />
                    </div>

                    <div className={"p-4"}>
                      <h3 className={"font-semibold text-gray-800 text-lg mb-1 truncate"}>
                        {item.name}
                      </h3>
                      <p className={"text-gray-600 font-semibold text-md mb-4"}>
                        {item.price}
                      </p>

                      {/* Controls */}
                      <div className={"flex items-center justify-between"}>
                        <div className={"flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1"}>
                          <button
                            onClick={() => decrement(item.id)}
                            className={"text-gray-600 cursor-pointer p-1"}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className={"text-sm font-medium w-6 text-center"}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increment(item.id)}
                            className={"text-gray-600 cursor-pointer p-1"}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className={"text-red-500 cursor-pointer p-2"}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right column */}
            <div className={"bg-white rounded-xl shadow-md p-6 order-2"}>
              <h2 className={"text-xl font-semibold mb-6 text-gray-800 border-b pb-2"}>
                Order Summary
              </h2>

              <div className={"space-y-4 mb-6"}>
                <div className={"flex justify-between"}>
                  <span className={"text-gray-600"}>
                    Subtotal ({totalItems} items)
                  </span>
                  <span className={"font-medium"}>
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className={"flex justify-between"}>
                  <span className={"text-gray-600"}>Shipping</span>
                  <span className={"font-medium"}>Free</span>
                </div>

                <div className={"flex justify-between"}>
                  <span className={"text-gray-600"}>Tax (8%)</span>
                  <span className={"font-medium"}>
                    ₹{(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={"flex justify-between items-center text-lg font-bold border-t pt-4 mb-6"}>
                <span>Total</span>
                <span>₹{(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
