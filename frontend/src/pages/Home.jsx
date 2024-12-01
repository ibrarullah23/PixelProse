import React from 'react'
import Posts from '../components/post/Posts';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { fetchHomeFeed } from '../helper/api';
import Loader from '../components/Loader';
import PostCard from '../components/post/PostCard';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';




const Home = () => {


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery('homefeed',
        fetchHomeFeed,
        { getNextPageParam: (lastPage, allPages) => { return lastPage.hasNext ? allPages.length + 1 : undefined } }
    )



    const { ref, inView } = useInView();

    useEffect(() => {
        if (hasNextPage && inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage]);

    if (status === 'loading') {
        return <div className="h-[40vh] flex justify-center items-center"><Loader /></div>
    }

    if (status === 'error') {
        return <h3 className="text-center font-bold mt-16">Error! {error}</h3>
    }


    return (
        <>
            <div className='mt-4 w-fit flex gap-5 min-h-[80svh] px-6 sm:px-10 mx-auto '>
                <div className='lg:pt-5 '>
                    {/* <div><Posts /></div> */}

                    {
                        data.pages.map((page, pageIndex) => {
                            return <div key={pageIndex}>
                                {page.posts.map((p) => {
                                    return <PostCard key={p._id} post={p} />
                                })}
                            </div>
                        })
                    }


                    <div ref={ref} className='p-4'>{isFetchingNextPage ? <div className="h-[20vh] flex justify-center items-center"><Loader /></div>
                        : hasNextPage ? <h3 className="text-center font-bold m-10">Scroll more</h3>
                            : <h3 className="text-center font-bold m-10">Yeh! You reach it all.</h3>
                    }</div>
                </div>



            </div>
        </>
    )
}

export default Home
