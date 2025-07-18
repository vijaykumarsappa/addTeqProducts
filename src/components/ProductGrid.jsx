import { useMemo } from "react";
import { useComparison } from "../context/ComparisonContext";
import ProductCard from "./ProductCard";
import { Grid, Container, Paper, Typography } from "@mui/material";

const ProductGrid = ({ products, searchTerm }) => {
  const { selectedProducts } = useComparison();

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const lowerTerm = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerTerm) ||
        p.brand.toLowerCase().includes(lowerTerm)
    );
  }, [products, searchTerm]);

  const handleKeyDown = (e, product) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const { addToCompare, removeFromCompare } = useComparison();
      const isSelected = selectedProducts.some((p) => p.id === product.id);

      if (isSelected) {
        removeFromCompare(product.id);
      } else if (selectedProducts.length < 3) {
        addToCompare(product);
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      {filteredProducts.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">No products found</Typography>
        </Paper>
      ) : (
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                isSelected={selectedProducts.some((p) => p.id === product.id)}
                onKeyDown={(e) => handleKeyDown(e, product)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductGrid;
