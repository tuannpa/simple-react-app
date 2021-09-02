import React from "react";
import './App.css';
import { Nav } from "react-bootstrap";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import NewsList from './news/components/news-list/news-list';

class App extends React.Component {
    render() {
        return (
            <div className="App p-5">
                <h1>News</h1>
                <Router>
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Switch>
                        <Route exact path='/' component={NewsList}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
