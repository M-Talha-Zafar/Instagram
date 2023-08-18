import { Box, Typography } from "@mui/material";
import { footerLinks } from "../utilities/constants";

const PublicFooter = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {footerLinks.map((link) => (
          <Typography key={link} sx={{ color: "#737373" }} variant="subtitle2">
            {link}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <p>English</p>
        <p>© 2023 Instagram from Meta</p>
      </Box>
    </Box>
  );
};

export default PublicFooter;
