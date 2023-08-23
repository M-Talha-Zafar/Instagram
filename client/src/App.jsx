import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import Upload from "./pages/upload";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import EditProfile from "./pages/editProfile";
import theme from "./utilities/theme";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CssBaseline from "@mui/material/CssBaseline";
import Profile from "./pages/profile";
import CreatePost from "./pages/createPost";
import Post from "./pages/post";
import Search from "./pages/search";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <UserProvider>
          <AuthProvider>
            <BrowserRouter>
              <CssBaseline />
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

                <Route
                  path="/user/edit"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/post/:id"
                  element={
                    <ProtectedRoute>
                      <Post />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:username/"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
