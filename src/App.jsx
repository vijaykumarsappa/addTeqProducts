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
            flexDirection: {
              xs: "column",
              md: showComparison ? "row" : "column",
            },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: showComparison ? "70%" : "100%" },
              pr: { xs: 0, md: showComparison ? 2 : 0 },
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
                width: { xs: "100%", md: "30%" },
                position: { xs: "static", md: "sticky" },
                top: 80,
                mt: { xs: 2, md: 0 },
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
