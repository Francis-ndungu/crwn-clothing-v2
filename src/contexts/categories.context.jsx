import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from "../shop-data.js";

// initializing our context
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// initializing our provider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect(() => { // adding the shop data to our database
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
