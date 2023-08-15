import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/upload";
import Login from "./pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/upload" element={<Upload />} />
        {/* <Route path="/users/:userId" element={<UserProfile />} /> */}
        {/* <Route path="/posts/:postId" element={<PostDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
