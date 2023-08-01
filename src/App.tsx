/** @format */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Milestones from "./components/timeline";
import Contact from "./components/contact";
import Blog from "./components/Blog";
import SinglePost from "./components/SinglePost";
import Stats from "./components/stats";
import TechStack from "./components/techStack";
import Photography from "./components/Photography";
import SingleGallery from "./components/SingleGallery";
import ReactGA from "react-ga4";
import GithubData from "./components/GithubData";
import netlifyIdentity from "netlify-identity-widget";

// Initialize Google Analytics
ReactGA.initialize([
  {
    trackingId: "G-9GE564L7WG",
  },
]);

netlifyIdentity.init();

const MainRoutes = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Update Google Analytics with page view each time the route changes
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<SinglePost />} />
      <Route path="/photography" element={<Photography />} />
      <Route path="/gallery/:slug" element={<SingleGallery />} />
      <Route path="/data" element={<GithubData />} />
      <Route
        path="/"
        element={
          <>
            <Hero />
            <TechStack />
            <Stats />
            <Milestones />
          </>
        }
      />
    </Routes>
  );
};

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Navbar />
      <MainRoutes />
      <Footer />
    </Router>
  </ChakraProvider>
);
