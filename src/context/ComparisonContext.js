import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorage(
    "compareProducts",
    []
  );

  const addToCompare = (product) => {
    if (
      selectedProducts.length < 3 &&
      !selectedProducts.some((p) => p.id === product.id)
    ) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedProducts,
        addToCompare,
        removeFromCompare,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
