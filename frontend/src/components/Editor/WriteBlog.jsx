import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import List from '@editorjs/list';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { uploadImageToCloudinary } from '../../helper/imageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, fetchBlog, updateBlog } from '../../helper/api';

const WriteBlog = () => {

  const [blogData, setBlogData] = useState({
    photo: "",
    title: "",
    subtitle: "",
    content: {}
  });

  const saveBlogMutation = useMutation(
    (blogData) => createBlog(blogData)
  );

  const imgMutation = useMutation(() => { return image }, {
  // const imgMutation = useMutation(uploadImageToCloudinary, {
    onSuccess: async (data) => {
      // console.log(data);
      // blogData.photo = data
      console.log("img success1", data.url);
      // setBlogData(p => ({ ...p, photo: data }))
      blogData.photo = data.url
    },
    onError: (error) => {
      setImage()
      console.log("imgMutation Error: ", error);
    },
    onSettled: async () => {
    },
  });

  const editorRef = useRef(null);
  const [image, setImage] = useState({ file: {}, url: "" });
  const handelKeyPressed = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          config: {
            levels: [2],
            defaultLevel: 2,
            placeholder: "Heading here"
          },
        },
        quote: Quote,
        code: CodeTool,
        embed: Embed,
        list: List,
      },
      placeholder: "Write Your Story",
      readOnly: false,
      onReady: () => {
        editorRef.current = editor;
      },
    });
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null;
      }
    };
  }, []);

  // save editor content, upload image and run mutation
  const saveContent = async () => {
    const blogtemp = {
      title: blogData.title,
      subtitle: blogData.subtitle
    }

    editorRef.current.save().then((content) => {
      // setBlogData(p => ({ ...p, content }))
      blogData.content = content
      blogtemp.content = content
    }).then(async () => {

      const customName = `img_${new Date().getTime()}`;

      imgMutation.mutate({ file: image.file, customName }, {
        onSuccess: (data) => {
          // setBlogData(p => ({ ...p, photo: data }))
          console.log("img success", data);
          // blogtemp.photo = data
          saveBlogMutation.mutate(blogData);
        },
      })
    }).catch((error) => {
      console.log("Error in saceContent ", error);
    })
  };


  return (
    <>
      <div className='px-5 sm:px-9 pt-8'>
        <div className='max-w-[680px] *:borde mx-auto space-y-5 '>
          <textarea className="text-xl sm:text-2xl w-full resize-none   theme-text theme-bg outline-none  font-title font-bold "
            type="text" name='title' placeholder='Title...' maxLength={60}
            onKeyDown={handelKeyPressed} value={blogData.title}
            onChange={(e) =>
              // { blogData.title = e.target.value; setImage(image) }
              setBlogData(p => ({ ...p, title: e.target.value }))
            } />

          <textarea className="text-sm sm:text-base resize-none  font-details w-full theme-text theme-bg outline-none  font-title font-bold"
            type="text" name='subtitle' placeholder='Subtitle...' maxLength={90} value={blogData.subtitle}
            onKeyDown={handelKeyPressed} onChange={(e) =>
              setBlogData(p => ({ ...p, subtitle: e.target.value }))
            } />

          <label htmlFor="blogimg" className=" select-none  rounded-xl overflow-hidden theme-bg-gray theme-shift min-h-[100px] flex justify-center items-center  ">

            {image.url ? <img src={image.url}
              className="object-cover w-full aspect-video" />
              :
              <div className='font-details font-bold text-gray-400/70  text-xl'> Select Image</div>
            }

            <input type="file" id='blogimg' hidden
              onChange={(e) => {
                const file = e.target.files[0]
                const url = URL.createObjectURL(file)
                if (file) {
                  setImage({ file, url })
                  // console.log("images is ",image);
                }
              }}
            />

          </label>

          <div className=' mx-auto w-max space-x-4'>
            <button className='theme-i theme-shift  rounded-lg px-3 py-1 font-details font-bold'
              onClick={saveContent}>Save</button>
            <button className='bg-zinc-400/30 dark:text-zinc-100 theme-shift  rounded-lg px-3 py-1 font-details font-bold'
              onClick={() => { navigate("/post/" + id) }}>Cancel</button>
          </div>

          <div id="editorjs"  ></div>

        </div>

      </div>

    </>
  )
};

export default WriteBlog
  ;
