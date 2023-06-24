      import React, { Component } from 'react'
      import NewsItem from './NewsItem'

      export class News extends Component {
        constructor(props) {
          super(props);
          this.state = {
            articles:[],
            currentPage:1
          };
          
        }
          // 8c7964127d5c4bd68054d687eb169810
          // 072988b7e4cc4e2e9f2a0f6803585c75
          async componentDidMount(){
            this.fetchArticles();
          };
          fetchArticles = async() => {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8c7964127d5c4bd68054d687eb169810&page=${this.state.currentPage}&pageSize=18`;
            let data = await fetch(url);
            let parsedData= await data.json();
            if (parsedData.articles!=null) {
              // Store the articles from the response in the variable
              let newData = parsedData.articles;
              this.setState({articles:newData})
            }
          }
         
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
          const { articles, currentPage } = this.state;

          if (articles === null) {
            return <div>Loading...</div>;
          }
          return (
            <div className='container my-3'>
                <h1 ref={ref => (this.headingRef = ref)}>News headlines</h1>
                <div className="container d-flex justify-content-between">
                <button disabled={currentPage<=1} class="btn btn-primary"  role="button" onClick={this.prevPage}>&larr;previous</button>
                <button class="btn btn-primary" role="button" onClick={this.nextPage}>next&rarr;</button>
                </div>
                <div className="row">
                  {articles.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url?element.url:""}>
                    <NewsItem  title={element.title?element.title.slice(0, 50):""} description={element.description?element.description.slice(0,90):""}  urlToImage={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url?element.url:""} />
                    </div>  
                  })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={currentPage<=1} class="btn btn-primary" role="button" onClick={this.prevPage}>&larr;previous</button>
                <button class="btn btn-primary" role="button" onClick={this.nextPage}>next&rarr;</button>
                </div>
            </div>
          )
        }
      }
      export default News
