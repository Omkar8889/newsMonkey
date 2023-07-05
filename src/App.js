import './App.css';
import NavBar  from './components/NavBar';
import React, { Component } from 'react'
import News from './components/News';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'

import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress:0,
      newsFilter: {
        catagory:"general",
        country:"us"
      }
    }; 
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
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
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
        <Routes>
        <Route path="/" element={<News newsFilter={this.state.newsFilter} setProgress={this.setProgress}/>} />
        <Route path="/about" element={<About />} />
          </Routes> 
        </Router>
      </div>
    )
  }
}
