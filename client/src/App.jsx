import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import Upload from "./pages/upload";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import theme from "./utilities/theme";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <UserProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route path="/upload" element={<Upload />} />
                {/* <Route path="/users/:userId" element={<UserProfile />} /> */}
                {/* <Route path="/posts/:postId" element={<PostDetail />} /> */}
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
