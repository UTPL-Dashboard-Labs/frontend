import "./App.css";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
