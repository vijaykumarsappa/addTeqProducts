import { useState, useEffect } from "react";
import { AppThemeProvider } from "./context/ThemeContext";
import { ComparisonProvider, useComparison } from "./context/ComparisonContext";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import ComparisonView from "./components/ComparisonView";
import Loader from "./components/Loader";
import products from "./data/products";
import { CssBaseline, Box, Container } from "@mui/material";

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { selectedProducts } = useComparison();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const showComparison = selectedProducts.length >= 2;

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Box component="main" sx={{ pt: 10 }}>
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: showComparison ? "row" : "column",
          }}
        >
          <Box
            sx={{
              width: showComparison ? "70%" : "100%",
              pr: showComparison ? 2 : 0,
            }}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <ProductGrid products={products} searchTerm={searchTerm} />
            )}
          </Box>
          {showComparison && (
            <Box
              sx={{
                width: "30%",
                position: "sticky",
                top: 80,
              }}
            >
              <ComparisonView />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

function App() {
  return (
    <AppThemeProvider>
      <ComparisonProvider>
        <CssBaseline />
        <div className="app">
          <AppContent />
        </div>
      </ComparisonProvider>
    </AppThemeProvider>
  );
}

export default App;
