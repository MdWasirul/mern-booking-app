import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />
      {/* Catch-all route for unmatched URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
