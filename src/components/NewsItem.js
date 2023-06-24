import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, newsUrl, urlToImage}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={urlToImage} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-primary">see news</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
