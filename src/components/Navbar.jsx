import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logo from "../assets/brand-logo.png";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mode, toggleTheme } = useTheme();

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#ecda93", color: "#000" }}
      elevation={2}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "50%", minWidth: "300px" }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 5,
                "& input::placeholder": {
                  color: "#000000",
                  opacity: 1,
                },
                "& .MuiSvgIcon-root": {
                  color: "#000000",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
