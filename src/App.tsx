import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Policy from "./pages/Policy";
import BlogPost from "./pages/BlogPost";
import ProjectDocs from "./pages/ProjectDocs";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/:slug/*" element={<ProjectDocs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
