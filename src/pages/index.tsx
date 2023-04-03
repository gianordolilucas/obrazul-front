import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { IProduct } from "../interfaces/IProduct";
import { ProductCollection } from "../components/ProductCollection";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Lista de produtos:</h1>
          {isLoading ? (
            <p>Carregando</p>
          ) : (
            <ProductCollection products={products} />
          )}
        </div>
      </main>
    </>
  );
}
