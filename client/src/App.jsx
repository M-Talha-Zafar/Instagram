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
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_EDIT_PROFILE,
  ROUTE_CREATE_POST,
  ROUTE_POST,
  ROUTE_SEARCH,
  ROUTE_REQUESTS,
  ROUTE_PROFILE,
} from "./utilities/routeNames"; // Import the route names

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
                  path={ROUTE_HOME}
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_LOGIN}
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path={ROUTE_SIGNUP}
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route
                  path={ROUTE_EDIT_PROFILE}
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_CREATE_POST}
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_POST}
                  element={
                    <ProtectedRoute>
                      <Post />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_SEARCH}
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_REQUESTS}
                  element={
                    <ProtectedRoute>
                      <Requests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_PROFILE}
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
