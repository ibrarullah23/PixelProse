
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import List from '@editorjs/list';


export const editorTools = {
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
}