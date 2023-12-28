'use client';
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

  // card to display posts
  const PromptCardList = ({ data, handleTagClick }) => {
    return(
      <div className='mt-16 prompt_layout'>
        {data.map((post) => 
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )}
      </div>
    )
  
  
  }
const Feed = () => {
  const [posts, setPosts] = useState([]);

  //search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  
  // create a useefffect to fetch post's
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);

  // function to filter posts depending on the searched key word [username,tag,post]
  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // search for similar text in 'searchText' while ignoring case ('i' case-insesitive)
    return posts.filter( //will return the matching elements depending on the regex 
      (item) => // will return true or false
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };
  // another way to search
  // const searchPosts = (searchText) => {
  //   const myResults = posts.filter((myitem) =>
  //     myitem.prompt.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setSearchedResults(myResults)
  // }
  // handle search
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(() => {
      const searchResult = filterPosts(e.target.value);
      setSearchedResults(searchResult);
    }, 500)
  }

    // search by clicking tag
    const handleTagClick = (tagName) => {
      setSearchText(tagName)
  
      const searchResult = filterPosts(tagName);
      setSearchedResults(searchResult);
  
    }
    

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />

      </form>
      {/* display searched posts */}
      {searchText ? (
          <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
        
      ): (
        // otherwise display all post if no search input is available
        <PromptCardList data={posts} handleTagClick={handleTagClick}/>
      )}

    </section>
  )
}

export default Feed