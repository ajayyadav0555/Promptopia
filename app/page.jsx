import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>Discover & Share
            <br className='max-md:hidden'/>
            <span className='orange_gradient text-center'>AI-Powered Prompts</span>
        </h1>
        <p className='desc text-center'>
            promptopia is an open-source AI propmpting tool for modern word to discover, create and  share creative Prompts
        </p>
        <Feed/>
    </section>
  )
}

export default Home