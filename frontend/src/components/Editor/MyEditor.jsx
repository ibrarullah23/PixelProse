// import React, { useState } from 'react';

// // const elements = [
// //     { tag: "paragraph", content: "This is paragraph content" },
// //     { tag: "heading1", content: "This is a heading 1" },
// //     { tag: "heading2", content: "This is a heading 2" },
// //     { tag: "blockquote", content: "This is a blockquote content" },
// //     { tag: "code", content: "This is some code content" },
// //     { tag: "paragraph", content: "Here is another paragraph content" },
// //     { tag: "heading1", content: "Another heading 1" },
// //     { tag: "heading2", content: "Another heading 2" },
// //     { tag: "blockquote", content: "Another blockquote content" },
// //     { tag: "code", content: "More code content" }
// // ];

// const MyEditor = () => {
//     const [isEditable, setIsEditable] = useState(false);

//     const elementsdata = [
//         { tag: "paragraph", content: "This is paragraph content" },
//         { tag: "heading1", content: "This is a heading 1" },
//         { tag: "heading2", content: "This is a heading 2" },
//         { tag: "blockquote", content: "This is a blockquote content" },
//         { tag: "code", content: "This is some code content" },
//         { tag: "paragraph", content: "Here is another paragraph content" },
//         { tag: "heading1", content: "Another heading 1" },
//         { tag: "heading2", content: "Another heading 2" },
//         { tag: "blockquote", content: "Another blockquote content" },
//         { tag: "code", content: "More code content" }
//     ];
//     const [elements, setElements] = useState(elementsdata);


//     const toggleEditable = () => {
//         setIsEditable(!isEditable);
//         console.log(elements)
//     };

//     const commonProps = {
//         contentEditable: isEditable ? 'plaintext-only' : false,
//         // contentEditable: isEditable ,
//         suppressContentEditableWarning: true
//     };

//     return (
//         <div className='myeditor'>

//             <button onClick={toggleEditable}>
//                 {isEditable ? "Disable Edit Mode" : "Enable Edit Mode"}
//             </button>

//             <button onClick={() => { elements.push({ tag: "heading1", content: "Added new heading" }) }}>add heading1</button>
//             {elements.map((element, index) => {
//                 console.log("rendered")
//                 const { tag, content } = element;
//                 return <div onInput={(e) => {
//                     elements[index].content = e.target.innerText 
//                     console.log(elements[index].content)
//                 }} {...commonProps} key={index} className={tag}
//                 >{content}</div>
//                 // switch (tag) {
//                 //     case 'paragraph':
//                 //         return <p   {...commonProps} key={index} className={tag}>{content}</p>;
//                 //     case 'heading1':
//                 //         return <h1 {...commonProps} key={index} className={tag}>{content}</h1>;
//                 //     case 'heading2':
//                 //         return <h2 {...commonProps} key={index} className={tag}>{content}</h2>;
//                 //     case 'blockquote':
//                 //         return <blockquote {...commonProps} key={index} className={tag}>{content}</blockquote>;
//                 //     case 'code':
//                 //         return <pre {...commonProps} key={index} className={tag}><code>{content}</code></pre>;
//                 //     default:
//                 //         return null;
//                 // }
//             })}
//         </div>
//     );
// };

// export default MyEditor;
