import './styles.css';
import { useCallback, useEffect, useState } from 'react';

import { Posts } from '../../components/Posts';
import {loadPosts} from'../../utils/load-posts';
import { Button } from '../../components/Button';
import { Search } from '../../components/Search'

export const Home = () =>{

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage ] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  
  const filterPosts = !!searchValue ? 
  posts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase())
  }) 
  : 
  posts;
  


  const disable = page + postsPerPage >= allPosts.length

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  },[])

  useEffect(()=>{
    handleLoadPosts(page, postsPerPage)
  },[handleLoadPosts, page, postsPerPage])

  const loadMorePosts = () =>{
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (e) =>{
    const {value} = e.target
    setSearchValue(value)
  }
  
  return(
    <section className = 'container' >
      <section className = 'search-container'>
        <Search 
          searchValue = {searchValue}
          handleChange = {handleChange}
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
          onClick = {loadMorePosts}
          />
        )}         
      </section>
    </section>    
  )
}


export default Home;
