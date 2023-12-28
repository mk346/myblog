// import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        {/* <br className='max-md:hidden'/> */}
        <br />
        <span className='orange_gradient text-center'>AI-Powered Posts</span>
        </h1>
        <p className='desc text-center'>This is a blog about Popular AI prompting tool for modern world to discover, create adn share creative prompts</p>

        {/* feed component */}
        <Feed/>
    </section>
  )
}

export default Home