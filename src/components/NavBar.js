import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export class NavBar extends Component {
  
  constructor(props) {
    super(props);
  };
  handleApply = () => {
    const newFilter = {
      ...this.props.newsFilter,
      country: document.getElementById('selectCountry').value,
      catagory: document.getElementById('selectCatagory').value
    };
    window.scrollTo({
      top: this.navRef.offsetTop,
      behavior: "smooth",
    });
    // Call the callback function to update the parent's state
    this.props.updateFilter(newFilter);
  };

  render() {
    return (
      <div className="">
                    <nav ref={ref => (this.navRef = ref)} className="navbar fixed-top navbar-expand-lg bg-body-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsMonkey</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item"><Link className="nav-link" to="/about">about</Link>
                    </li>
                </ul>
                </div>
            </div>
            <div className="d-flex">
            <select className="form-select mx-1" id="selectCountry">
                    <option value="in" selected>India</option>
                    <option value="us">United States</option>
                    <option value="gb">United Kingdom</option>
                    <option value="au">Australia</option>
                    <option value="ca">Canada</option>
                  </select>
                  <select className="form-select mx-1" id="selectCatagory">
                    <option value="business" >Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general" selected>General</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                  </select>
                    <button className="btn btn-info mx-2"onClick={this.handleApply}>apply</button>
            </div>
            </nav>
      </div>
    )
  }
}

export default NavBar
