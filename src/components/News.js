import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      // api keys
      // apiKey: "8c7964127d5c4bd68054d687eb169810",
      apiKey:"072988b7e4cc4e2e9f2a0f6803585c75",
      currentPage: 1,
      loading: false,
    };
  }
  // render components first time
  async componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps) {
    // Compare previous props with current props
    if (prevProps.newsFilter !== this.props.newsFilter) {
      // Prop value has changed, trigger re-render
      this.fetchArticles();
    }
  }
  // call news api for articles
  fetchArticles = async () => {
    document.title = `NEWS-${this.props.newsFilter.catagory}`;
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.newsFilter.country}&category=${this.props.newsFilter.catagory}&apiKey=${this.state.apiKey}&page=${this.state.currentPage}&pageSize=8`;
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(60)
    if (parsedData.articles != null) {
      // Store the articles from the response in the variable
      let newData = parsedData.articles;
      let totalArticles = parsedData.totalResults;
      this.setState({
        articles: newData,
        totalCount: totalArticles,
        loading: false,
      });
      this.props.setProgress(100)
    }
  };
  // previous page btn
  prevPage = async () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage - 1 }),
      () => {
        this.fetchArticles();
        window.scrollTo({
          top: this.headingRef.offsetTop,
          behavior: "smooth",
        });
      }
    );
  };
  // Next page btn
  nextPage = async () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage + 1 }),
      () => {
        this.fetchArticles();
      }
    );
  };
  // fetchMore for infinite scroll
  fetchMoreData = async() => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }),
      async() => {let url = `https://newsapi.org/v2/top-headlines?country=${this.props.newsFilter.country}&category=${this.props.newsFilter.catagory}&apiKey=${this.state.apiKey}&page=${this.state.currentPage}&pageSize=8`;
      let data = await fetch(url);
      let parsedData = await data.json();
      if (parsedData.articles != null) {
        let newData = parsedData.articles;
        let totalArticles = parsedData.totalResults;
        this.setState({
          articles: this.state.articles.concat(newData),
          totalCount: totalArticles,
        });
      }
      }
    );
  };

  render() {
    const { articles,totalCount } = this.state;
    return (
      <>
        <h1 className="text-center" >Top {this.props.newsFilter.catagory} headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length!==totalCount}
          loader={<Spinner />}
        >
          <div className="container">

          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url ? element.url : ""}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description? element.description.slice(0, 90): "" }
                    urlToImage={
                      element.urlToImage? element.urlToImage: "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
                    newsUrl={element.url ? element.url : ""}
                    newsDate={element.publishedAt ? element.publishedAt : "--:--"}
                    author={element.author ? element.author : "Unknown"}
                    />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}
export default News;
