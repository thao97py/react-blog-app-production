import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Context } from "./context/Context";
import Footer from "./components/footer/Footer";
import Contact from "./pages/contact/Contact";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/about">
            <About />
        </Route>
        <Route exact path="/contact">
            <Contact />
        </Route>
        <Route path="/register">{user ? <Home/> : <Register />}</Route>
        <Route path="/login">{user ? <Home/> : <Login />}</Route>
        <Route path="/write">{user ? <Write/> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings/> : <Login />}</Route>
        <Route path="/post/:postId">
            <Single />
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
