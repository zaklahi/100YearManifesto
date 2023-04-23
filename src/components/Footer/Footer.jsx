import React from "react";
import "./Footer.css";
import { Typography, Link } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center">
        {" © "}
        <Link color="inherit" href="https://www.100yearmanifesto.com/">
          100 Year Manifesto
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
}

export default Footer;
