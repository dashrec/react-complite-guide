import { faker } from '@faker-js/faker';
import { createContext, useContext, useMemo, useState } from 'react';

// 1) CREATE NEW CONTEXT
const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState('');
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  // const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // when parent app component rerenders this value object will be recreated which causes waste render of the child components therefor we use useMemo to memorize the object
  // when the one of the value inside context changes, all consumer components will rerender
  // normally we create context for each values
  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery: searchQuery,
      setSearchQuery,
    };
  }, [searchQuery, searchedPosts]);

  return (
    // 2) PROVIDE VALUE TO THE CHILD COMPONENT
    <PostContext.Provider value={value}>{children}</PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error('PostContext was used outside of the PostProvider');

  return context;
}

export { PostProvider, usePosts };
