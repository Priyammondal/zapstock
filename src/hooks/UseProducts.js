import { useEffect, useState } from "react";
import * as api from "../api/products.api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return { products, setProducts, loading };
};
