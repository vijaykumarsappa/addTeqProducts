import { useComparison } from "../context/ComparisonContext";
import { useTheme } from "../context/ThemeContext";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ComparisonView = () => {
  const { selectedProducts, removeFromCompare, clearComparison, isLoading } =
    useComparison();
  const { mode } = useTheme();

  if (selectedProducts.length < 2) return null;

  const allFeatures = new Set();
  selectedProducts.forEach((product) => {
    Object.keys(product.features).forEach((key) => allFeatures.add(key));
  });

  const getHighlightStyle = (value, products) => {
    const allValues = products.map((p) => p.features[value] || "N/A");
    if (new Set(allValues).size === 1) return {};
    return {
      backgroundColor:
        mode === "dark" ? "rgba(255, 255, 0, 0.1)" : "rgba(255, 255, 0, 0.3)",
      fontWeight: "bold",
    };
  };

  const skeletonRows = 5;

  return (
    <Paper sx={{ p: { xs: 1, sm: 3 }, my: { xs: 1, sm: 3 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 1, sm: 0 }}
      >
        {isLoading ? (
          <Skeleton width={200} height={32} />
        ) : (
          <Typography variant="h5">Product Comparison</Typography>
        )}
        {isLoading ? (
          <Skeleton width={120} height={36} />
        ) : (
          <Button
            variant="outlined"
            color="error"
            onClick={clearComparison}
            startIcon={<CloseIcon />}
            sx={{ textTransform: "capitalize" }}
          >
            Clear All
          </Button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{isLoading ? <Skeleton /> : "Feature"}</TableCell>
              {selectedProducts.map((product) => (
                <TableCell key={product.id}>
                  {isLoading ? (
                    <Skeleton count={2} />
                  ) : (
                    <Box display="flex" alignItems="center">
                      <IconButton
                        size="small"
                        onClick={() => removeFromCompare(product.id)}
                        sx={{ mr: 1 }}
                      >
                        <CloseIcon
                          fontSize="small"
                          sx={{ color: "rgb(66, 199, 139)" }}
                        />
                      </IconButton>
                      <Box>
                        <Typography variant="subtitle1">
                          {product.name}
                        </Typography>
                        <Typography variant="caption">
                          {product.brand}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{isLoading ? <Skeleton /> : "Price"}</TableCell>
              {selectedProducts.map((product) => (
                <TableCell key={`price-${product.id}`}>
                  {isLoading ? <Skeleton /> : `$${product.price}`}
                </TableCell>
              ))}
            </TableRow>

            {isLoading
              ? Array.from({ length: skeletonRows }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    {selectedProducts.map((product) => (
                      <TableCell key={`skeleton-cell-${product.id}-${index}`}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : Array.from(allFeatures).map((feature) => (
                  <TableRow key={feature}>
                    <TableCell>{feature}</TableCell>
                    {selectedProducts.map((product) => (
                      <TableCell
                        key={`${feature}-${product.id}`}
                        sx={getHighlightStyle(feature, selectedProducts)}
                      >
                        {product.features[feature] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ComparisonView;
