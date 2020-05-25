import React,{ Component } from "react";

import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
//import faceactive && highactive
import FaceActive from './components/FaceActive';
import HighActive from './components/HighActive';

class App extends Component {
  render() {
    return (
      <div>
        <nav className='header'>
          <ul>
            <li>
              <Link to='/faceactive'>高压图纸处理</Link>
            </li>
            <li>
              <Link to='/highactive'>低压图纸处理</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/faceactive">
            <FaceActive></FaceActive>
          </Route>
          <Route path="/highactive">
            <HighActive />
          </Route>
          <Route path="/">
            <FaceActive></FaceActive>
          </Route>
        </Switch>
      </div>
    );
  }
}


export default App;
