import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import EditProfile from "./pages/edit-profile";
import theme from "./utilities/theme";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import PublicRoute from "./components/utilities/PublicRoute";
import CssBaseline from "@mui/material/CssBaseline";
import Profile from "./pages/profile";
import CreatePost from "./pages/create-post";
import Post from "./pages/post";
import Search from "./pages/search";
import Requests from "./pages/requests";

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
                  path="/requests"
                  element={
                    <ProtectedRoute>
                      <Requests />
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
