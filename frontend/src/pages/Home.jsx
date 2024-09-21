import React from 'react'
import Posts from '../components/post/Posts';

const Home = () => {


    return (
        <>
            <div className='mt-4 w-fit flex gap-5 min-h-[80svh] px-6 sm:px-10 mx-auto '>
                <div className='lg:scale-110 lg:pt-5 '>
                    <div><Posts /></div>
                </div>
            </div>
        </>
    )
}

export default Home
