import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register';
import Profile from './pages/Profile'
import UnAuthorized from './components/UnAuthorized';
import Authorized from './components/Authorized';
import NewsApi from './pages/NewsApi'
// import MyEditor from './components/Editor/MyEditor'
// import MyQuill from './components/Editor/MyQuill'
// import MarkdownEditor from './components/Editor/MarkdownEditor'
import WriteBlog from './components/Editor/WriteBlog';
import UpdateBlog from './components/Editor/UpdateBlog';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // layout
    children: [
      {
        index: true,
        element: <Home />, // home
      },
      {
        path: "/write",
        element: <WriteBlog />,
        // element: <MyEditor />,
        // element: <MyQuill />,
        // element: <MarkdownEditor />,
      },
      {
        path: "/news",
        element: <NewsApi />,
      },
      {
        path: "/post/edit/:id", // protected 
        element: <UpdateBlog />,
        children: [],
      },
      {
        path: "/post/:id", // protected 
        element: <Post />, // layout
        children: [],
      },
      {
        path: "/:username", // protected 
        element: <Profile />, // layout
      },
      {
        path: "/",
        element: <UnAuthorized />,
        children: [
          {
            path: "login",
            element: <Login />, // 
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/", // protected user
        element: <Authorized />,
        children: [
          {
            path: "settings",
            element: <h2>settings</h2>,
            children: [
              {
                index: true,
                element: <h2>settings</h2>,
              },
              {
                path: "edit-profile",
                element: <h1>edit profile</h1>,
              },
            ],
          },
          {
            path: "write",
            element: <></>,
          },
        ],
      },
    ],
  },
])

function App() {

  const htmldata = [
    {
      tag: "h1",
      class: "",
      text: "this is h1"
    },
    {
      tag: "h2",
      text: "simple h2"
    },
  ]


  

  return (
    <>
      {/* <div className='custom-reset' id='myeditor'>
        

      </div> */}
      {/* <button onClick={() => { document.getElementById('myeditor').innerHTML = document.getElementById('myeditor').innerHTML + "<h1 contentEditable>WRITE</h1>" }}>add</button> */}
      <RouterProvider router={routes} />
    </>
  )
}

export default App
