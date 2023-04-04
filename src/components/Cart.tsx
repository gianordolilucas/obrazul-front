import { IProduct } from "@/interfaces/IProduct";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { useCart } from "../context/CartContextProvider";
type cartProp = {
  open: boolean;
  onClose: () => void;
};
export default function Cart({ open, onClose }: cartProp) {
  const { cartState } = useCart();
  const cartClasses = open ? "translate-x-0" : "translate-x-full";
  const cartRef = useRef<Element | null>(null);

  const calcTotal = () => {
    const total = cartState.items.reduce(
      (acc, curr) => acc + Number(curr.product.price) * curr.quantity,
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    const handleClickOutsideCart = (event: MouseEvent) => {
      const cartElement = document.getElementById("cart");
      if (cartElement && !cartElement.contains(event.target as Node)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutsideCart);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 overflow-hidden z-50 ${cartClasses}`}>
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div
          className="relative w-screen max-w-md transition-all duration-300 ease-out"
          id="cart"
        >
          <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
            <div className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Carrinho</h2>
                <button
                  type="button"
                  className="ml-3 h-7 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={onClose}
                >
                  <span className="sr-only">Fechar carrinho</span>
                  <svg
                    className="h-6 w-6 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6 relative flex-1 px-4 sm:px-6">
              <div className="absolute inset-0 px-4 sm:px-6">
                <div
                  className="h-full border-2 border-dashed border-gray-200"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartState.items.map((item) => (
                      <li key={item.product.ean} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.picture}
                            alt={item.product.fullname}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                {/* <a href={product.href}>
                                          {product.name}
                                        </a> */}
                              </h3>
                              <p className="ml-4">{item.product.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              {/* Adicione o total do carrinho aqui */}
              <div className="text-right text-gray-700">
                Total: {calcTotal()}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Finalizar compra
                </button>
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href="#"
                  className="text-base font-medium text-gray-700 hover:text-gray-800"
                >
                  Continuar comprando
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
