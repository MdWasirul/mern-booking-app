import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import AddHotel from "./Pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotel from "./Pages/MyHotel";
function App() {
  const { isLoggedIn } = useAppContext();
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
      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotel"
            element={
              <Layout>
                <MyHotel />
              </Layout>
            }
          />
        </>
      )}
      {/* Catch-all route for unmatched URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
