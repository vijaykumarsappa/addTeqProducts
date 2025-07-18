import { useComparison } from "../context/ComparisonContext";
import { useEffect, useRef } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import CompareIcon from "@mui/icons-material/Compare";

const ProductCard = ({ product, isSelected, onKeyDown }) => {
  const { addToCompare, removeFromCompare } = useComparison();
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && isSelected) {
      cardRef.current.focus();
    }
  }, [isSelected]);

  const handleCompareClick = () => {
    if (isSelected) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <Card
      ref={cardRef}
      tabIndex="0"
      onKeyDown={(e) => onKeyDown(e, product)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: isSelected
          ? "2px solid rgb(253, 116, 1)"
          : "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: isSelected ? "0 0 10px rgb(253, 116, 1)" : "none",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        transform: "scale(1)",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(253, 116, 1, 0.5)",
          zIndex: 2,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: "contain",
          p: 1,
          backgroundColor: "#f9f9f9",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Chip
          label={product.brand}
          size="small"
          sx={{ mb: 1, backgroundColor: "#ffd43b", fontWeight: "bold" }}
        />
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          ${product.price}
        </Typography>
        <List dense>
          {Object.entries(product.features).map(([key, value]) => (
            <ListItem key={key} disablePadding>
              <ListItemText primary={`${key}: ${value}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={isSelected ? "outlined" : "contained"}
          //color="primary"
          sx={{ backgroundColor: "#097969", color: "#fff" }}
          startIcon={<CompareIcon />}
          onClick={handleCompareClick}
          size="small"
        >
          {isSelected ? "Remove" : "Compare"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
