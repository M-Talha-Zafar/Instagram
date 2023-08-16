import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Upload from "./pages/upload";
import Login from "./pages/login";
import Signup from "./pages/signup";
import theme from "./utilities/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          {/* <Route path="/users/:userId" element={<UserProfile />} /> */}
          {/* <Route path="/posts/:postId" element={<PostDetail />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
