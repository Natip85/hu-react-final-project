import { createContext, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import CssBaseline from "@mui/material/CssBaseline";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Footer from "./components/Footer";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import MyCard from "./pages/MyCard";
import RouteGuard from "./auth/RouteGuard";
import AdminGuard from "./auth/AdminGuard";
import Sandbox from "./pages/Sandbox";
import AddCard from "./pages/AddCard";
import CardDetails from "./pages/CardDetails";
import EditCard from "./pages/EditCard";
import Profile from "./pages/Profile";
import { getUser } from "./auth/TokenManager";
import EditUser from "./pages/EditUser";
import ResetPassword from "./pages/ResetPassword";

export interface UserContext {
  userName: string;
  setUserName: Function;
  admin: boolean;
  setAdmin: Function;
  business: boolean;
  setBusiness: Function;
  user: any;
  setUser: Function;
}

export const AppContext = createContext<UserContext | null>(null);

const userData = getUser();

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [userName, setUserName] = useState(
    userData ? userData.firstName : "user"
  );
  const [admin, setAdmin] = useState(userData ? userData.admin : false);
  const [user, setUser] = useState();
  const [business, setBusiness] = useState(
    userData ? userData.business : false
  );
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  function handleClick() {
    const toggleMode = mode === "dark" ? "light" : "dark";
    setMode(toggleMode);
  }

  return (
    <>
      <div style={{ paddingTop: 100 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AppContext.Provider
            value={{
              userName,
              setUserName,
              admin,
              setAdmin,
              business,
              setBusiness,
              user,
              setUser,
            }}
          >
            <Header isTopOfPage={isTopOfPage} />

            <div style={{ position: "fixed", top: 100, left: 20 }}>
              <IconButton color="info" onClick={handleClick}>
                {theme.palette.mode === "dark" ? (
                  <Brightness4Icon />
                ) : (
                  <NightsStayIcon />
                )}
              </IconButton>
            </div>

            <ToastContainer position="bottom-left" theme="dark" />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<About />} />
              <Route path="reset/:id" element={<ResetPassword />} />
              <Route
                path="card-details/:id"
                element={
                  <RouteGuard>
                    <CardDetails />
                  </RouteGuard>
                }
              />
              <Route
                path="edit-card/:id"
                element={
                  <RouteGuard>
                    <EditCard />
                  </RouteGuard>
                }
              />
              <Route
                path="profile/:id"
                element={
                  <RouteGuard>
                    <Profile />
                  </RouteGuard>
                }
              />
              <Route
                path="favorites"
                element={
                  <RouteGuard>
                    <Favorites />
                  </RouteGuard>
                }
              />
              <Route
                path="mycards"
                element={
                  <RouteGuard>
                    <MyCard />
                  </RouteGuard>
                }
              />

              <Route
                path="addcards"
                element={
                  <RouteGuard>
                    <AddCard />
                  </RouteGuard>
                }
              />
              <Route
                path="sandbox"
                element={
                  <AdminGuard>
                    <Sandbox />
                  </AdminGuard>
                }
              />
              <Route
                path="edituser/:id"
                element={
                  <AdminGuard>
                    <EditUser />
                  </AdminGuard>
                }
              />
            </Routes>

            <Footer />
          </AppContext.Provider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
