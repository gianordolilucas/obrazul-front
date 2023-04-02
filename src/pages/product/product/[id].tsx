import { useRouter } from "next/router";
import type { IProduct } from "../../../interfaces/IProduct";

const ProductPage = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>EAN: {product.ean}</p>
      <p>Fullname: {product.fullname}</p>
      <p>Price: {product.price}</p>
      <img src={product.picture} alt={product.name} />
    </div>
  );
};
