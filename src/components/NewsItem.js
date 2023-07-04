import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, newsUrl, urlToImage,newsDate, author}=this.props;
    return (
      <div>
        <div className="card" >
            <img src={urlToImage} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}.</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className='text-muted'>By {author} on {new Date(newsDate).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-primary">see news</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
