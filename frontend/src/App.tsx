import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import AddHotel from "./Pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotel from "./Pages/MyHotel";
import EditHotel from "./Pages/EditHotel";
import Search from "./Pages/Search";
import Detail from "./Pages/Detail";
import Booking from "./Pages/Booking";
import MyBookings from "./Pages/MyBookings";
import Home from "./Pages/Home";
function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
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
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/detail/:hotelId"
        element={
          <Layout>
            <Detail />
          </Layout>
        }
      />
      {isLoggedIn && (
        <>
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
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
          <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookings />
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
