/** @format */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
const Hero = React.lazy(() => import("./components/hero"));
const Navbar = React.lazy(() => import("./components/navbar"));
const Footer = React.lazy(() => import("./components/footer"));
const Milestones = React.lazy(() => import("./components/timeline"));
const Contact = React.lazy(() => import("./components/contact"));
const Blog = React.lazy(() => import("./components/Blog"));
const SinglePost = React.lazy(() => import("./components/SinglePost"));
const Stats = React.lazy(() => import("./components/stats"));
const TechStack = React.lazy(() => import("./components/techStack"));
const Photography = React.lazy(() => import("./components/Photography"));
const SingleGallery = React.lazy(() => import("./components/SingleGallery"));
const GithubData = React.lazy(() => import("./components/GithubData"));
import netlifyIdentity from "netlify-identity-widget";
import ReactGA from "react-ga4";

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
