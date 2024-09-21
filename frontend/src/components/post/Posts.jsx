import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import PostCard from './PostCard';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Posts = ({props}) => {

  const [isLoading, setisLoading] = useState(!true);
  const { data } = {
    isLoading: !true,
    data: [
      {
        "_id": "64c0b9e8e4b1d2f5c9e5e5e5",
        "photo": "https://picsum.photos/id/233/200",
        "title": "10 Because of a Question About try…catch, I Failed My Interview",
        "username": "johndoe",
        "createdAt": "2024-07-26T12:34:56Z",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor."
      },
      {
        "_id": "64c0ba12e4b1d2f5c9e5e5e6",
        "photo": "https://picsum.photos/id/223/200",
        "title": "Exploring the Depths of the Ocean",
        "username": "janedoe",
        "createdAt": "2024-07-25T10:15:30Z",
        "desc": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        "_id": "64c0ba3be4b1d2f5c9e5e5e7",
        "photo": "https://picsum.photos/id/265/200",
        "title": "A Day in the Life of a Software Developer",
        "username": "developer123",
        "createdAt": "2024-07-24T08:00:00Z",
        "desc": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ]
  }

 // useInfinitQuery - fetch all posts and mount
 // queryKey = ['user']

  const {username} = useParams();

  return (
    <>
      {isLoading ?
        <div className="h-[40vh] flex justify-center items-center"><Loader /></div>
        : (data.length > 0) ?
        data.filter(post => username ? (post.username === username) : post.username ).map((p) => (<PostCard key={p._id} post={p} />))
          : <h3 className="text-center font-bold mt-16">No posts available</h3>}
    </>
  )
}

export default Posts
