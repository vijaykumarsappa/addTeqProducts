import { Box } from "@mui/material";

const ShimmerEffect = ({ width = "100%", height = "20px", mb = 1 }) => {
  return (
    <Box
      sx={{
        width,
        height,
        mb,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "4px",
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      }}
    />
  );
};

export const ShimmerRow = ({ columns = 3 }) => {
  return (
    <Box display="flex">
      <ShimmerEffect width="30%" height="40px" />
      {Array.from({ length: columns }).map((_, i) => (
        <ShimmerEffect key={i} width="23%" height="40px" ml={1} />
      ))}
    </Box>
  );
};

export default ShimmerEffect;
