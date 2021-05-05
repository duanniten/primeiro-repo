import './styles.css';
import { Component } from 'react';

import { Posts } from '../../components/Posts';
import {loadPosts} from'../../utils/load-posts';
import { Button } from '../../components/Button';
import { Search } from '../../components/Search'

class Home extends Component{
  state = {
    posts : [],
    allPosts: [],
    page: 0,
    postsPerPage : 10,
    searchValue: ''
  }
   
  componentDidMount() {
    this.loadPosts();  
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts : postsAndPhotos.slice(page, postsPerPage),
      allPosts :postsAndPhotos
    })
  }

  loadMorePosts = () =>{
    const{
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage})
  }
  handleChange = (e) =>{
    const {value} = e.target
    this.setState({searchValue : value})
  }

  render(){
    const { posts, page, allPosts, postsPerPage, searchValue } = this.state
    const disable = page + postsPerPage >= allPosts.length
    
    const filterPosts = !!searchValue ? 
      posts.filter(post => {
        return post.title.toLowerCase().includes(searchValue. toLowerCase())
      }) 
      : 
      posts;

    return(
      <section className = 'container' >
        <section className = 'search-container'>
          <Search 
            searchValue = {searchValue}
            handleChange = {this.handleChange}
          />
        </section>
        
        {filterPosts.length > 0 ?
          <Posts posts = {filterPosts}/>
          :
          <p>Não existe</p>}

        <section className = 'button-container'>
          {!searchValue && (
            <Button 
            text = 'teste de texto'
            disabled = {disable}
            onClick = {this.loadMorePosts}
            />
          )}         
        </section>
      </section>
      
    )  
  }
}

export default Home;
