import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useState,
} from "react";
import { IProduct } from "@/interfaces/IProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type CartItem = {
  product: IProduct;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type Action = { type: "ADD_ITEM" | "REMOVE_ITEM"; payload: CartItem };

type CartContextType = {
  cartState: CartState;
  dispatch: (action: Action) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.ean !== action.payload.product.ean
        ),
      };

    case "ADD_ITEM":
      const cartProduct = state.items.find(
        (item) => item.product.ean === action.payload.product.ean
      );
      if (cartProduct) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.ean === action.payload.product.ean
              ? { ...action.payload, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: any) => {
  const teste = useReducer(cartReducer, { items: [] });
  const [cartState, dispatch] = teste;
  const value = {
    cartState,
    dispatch,
  };
  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const { cartState, dispatch } = useContext<CartContextType>(CartContext);

  const addItem = (product: IProduct) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity: 1 } });
    toast.success("Item Adicionado");
  };

  const removeItem = (product: IProduct) => {
    dispatch({ type: "REMOVE_ITEM", payload: { product, quantity: 1 } });
  };

  return {
    cartState,
    addItem,
    removeItem,
  };
};
