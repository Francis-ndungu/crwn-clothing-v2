import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

// initializing our context
export const ProductsContext = createContext({
  products: [],
});

// initializing our provider
export const ProductProvider = ({ children }) => {
  const [products, setProduct] = useState(PRODUCTS);
  const value = { products, setProduct };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
