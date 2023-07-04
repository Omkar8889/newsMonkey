import './App.css';
import NavBar  from './components/NavBar';
import React, { Component } from 'react'
import News from './components/News';
import About from './components/About';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsFilter: {
        catagory:"general",
        country:"us"
      }
    }; 
  }
  updateFilter=(newFilter)=>{
    console.log('new filter')
    console.log(newFilter)
    this.setState(this.state.newsFilter=newFilter)
    console.log(this.state.newsFilter)
  }
  render() {
   
    
    return (
      <div>
        <Router>
        <NavBar newsFilter={this.state.newsFilter} updateFilter={this.updateFilter}/>
        <Routes>
        <Route path="/" element={<News newsFilter={this.state.newsFilter}/>} />
        <Route path="/about" element={<About />} />
          </Routes> 
        </Router>
      </div>
    )
  }
}
