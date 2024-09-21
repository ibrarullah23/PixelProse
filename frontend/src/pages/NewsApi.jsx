import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';


const fetchNews = async ({ pageParam = 1, queryKey }) => {
  const [_, author] = queryKey;
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=bitcoin&pageSize=1&page=${pageParam}&apiKey=10c227a26c4443c29a7234982b6b2c47`
  );

  if (author) {
    const filteredArticles = response.data.articles.filter(article =>
      article.author && article.author.toLowerCase().includes(author.toLowerCase())
    );
    return { ...response.data, articles: filteredArticles };
  }

  return response.data;
};



const NewsApi = () => {

  const [author, setAuthor] = useState('Radek Zielinski');



  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('news', fetchNews, {
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.totalResults / 10);
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : false;
    },
  });

  const loadMoreButtonRef = useRef();

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }
    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [handleObserver]);

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const filteredArticles = data?.pages
    .flatMap(page => page.articles)
    .filter(article =>
      article.author && article.author.toLowerCase().includes(author.toLowerCase())
    );


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bitcoin News</h1>
      <input
        type="text"
        placeholder="Filter by author name"
        value={author}
        onChange={handleAuthorChange}
        className="mb-4 p-2 border rounded"
      />

      <p className="mb-4 sticky top-[100px] bg-gray-50">Total Articles: {filteredArticles?.length || 0}</p>
      <div>
        {filteredArticles?.map((article) => (
          <div
            key={article.url}
            className="mb-8 p-4 border rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700">{article.description}</p>
            <p className="text-gray-600">By {article.author || "Unknown Author"}</p>
            <p className="text-gray-500">Published at: {new Date(article.publishedAt).toLocaleDateString()}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
      <div ref={loadMoreButtonRef} className="mt-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'No more articles'}
        </button>
      </div>
    </div>
  );
};

export default NewsApi
