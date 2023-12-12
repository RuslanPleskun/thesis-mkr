import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import AddExpense from "./pages/AddExpense/AddExpense";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./pages/Home/Home";
import Records from "./pages/Records/Records";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/add-record" component={AddExpense} />
          <ProtectedRoute exact path="/records" component={Records} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
