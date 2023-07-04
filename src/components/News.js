      import React, { Component } from 'react'
      import NewsItem from './NewsItem'
      import Spinner from './Spinner';
      import PropTypes from 'prop-types'
      
      export class News extends Component {
        constructor(props) {
          super(props);
          this.state = {
            articles:[],
              // api keys 
          apiKey:"8c7964127d5c4bd68054d687eb169810",
          // apiKey:"072988b7e4cc4e2e9f2a0f6803585c75",
            currentPage:1,
            loading:false

          };
          
        }
          // render components first time
          async componentDidMount(){
            this.fetchArticles();
          };
          componentDidUpdate(prevProps) {
            // Compare previous props with current props
            if (prevProps.newsFilter !== this.props.newsFilter) {
              // Prop value has changed, trigger re-render
              this.fetchArticles();
            }
          }
          // call news api for articles
          fetchArticles = async() => {
           
            this.setState({loading:true})
            document.title=`NEWS-${this.props.newsFilter.catagory}`;
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.newsFilter.country}&category=${this.props.newsFilter.catagory}&apiKey=${this.state.apiKey}&page=${this.state.currentPage}&pageSize=18`;
            let data = await fetch(url);
            let parsedData= await data.json();
            if (parsedData.articles!=null) {
              // Store the articles from the response in the variable
              let newData = parsedData.articles;
              let totalArticles=parsedData.totalResults;
              this.setState({articles:newData,
              totalCount:totalArticles,
              loading:false
              })
            }
          }
          // previous page btn
            prevPage=async()=>{
              this.setState(
                prevState => ({ currentPage: prevState.currentPage - 1 }),
                () => {this.fetchArticles();
                  window.scrollTo({
                    top: this.headingRef.offsetTop,
                    behavior: 'smooth'
                  });
                }
              );
            }
            // Next page btn
            nextPage=async()=>{
              this.setState(
                prevState => ({ currentPage: prevState.currentPage + 1 }),
                () => {this.fetchArticles();
                window.scrollTo({
                  top: this.headingRef.offsetTop,
                  behavior: 'smooth'
                });
              }
            );
          }
    
        render(){
          const { articles, currentPage, loading } = this.state;
          return (
            <div className='container my-3'>
                <h1 className='text-center' ref={ref => (this.headingRef = ref)}>Top {this.props.newsFilter.catagory} headlines</h1>
                {loading?<Spinner/>:""}
                
                <div className="row">
                  {!loading && articles.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url?element.url:""}>
                      
                    <NewsItem  title={element.title?element.title.slice(0, 50):""} description={element.description?element.description.slice(0,90):""}  urlToImage={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url?element.url:""} newsDate={element.publishedAt?element.publishedAt:"--:--"}author={element.author?element.author:"Unknown"} />
                    </div>  
                  })}
                </div>

                {/* pev and next btns */}
                <div className="container d-flex justify-content-between">
                <button disabled={currentPage<=1} class="btn btn-primary" role="button" onClick={this.prevPage}>&larr;previous</button>
                <button disabled={currentPage>=Math.ceil(this.state.totalCount/18)} class="btn btn-primary" role="button" onClick={this.nextPage}>next&rarr;</button>
                </div>
            </div>
          )
        }
      }
      export default News

      