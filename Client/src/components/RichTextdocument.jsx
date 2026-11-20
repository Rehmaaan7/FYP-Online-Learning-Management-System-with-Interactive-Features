

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  // ✅ Sync backend data INTO editor
  useEffect(() => {
    if (quill && input) {
      const current = quill.root.innerHTML;

      // only update if editor is empty OR different
      if (current === "<p><br></p>" || current !== input) {
        quill.clipboard.dangerouslyPasteHTML(input);
      }
    }
  }, [input, quill]);

  // ✅ Sync editor typing OUT to state
  useEffect(() => {
    if (quill) {
      const handler = () => {
        const html = quill.root.innerHTML;
        setInput(html);
      };

      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill]);

  return (
    <div style={{ background: "white" }}>
      <div ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;



// import React, { useEffect } from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

// const RichTextEditor = ({ input, setInput }) => {
//   const { quill, quillRef } = useQuill({
//     theme: "snow",
//     modules: {
//       toolbar: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image"],
//         ["clean"],
//       ],
//     },
//   });

//   useEffect(() => {
//     if (quill) {
//       if (input) {
//         quill.clipboard.dangerouslyPasteHTML(input);
//       }

//       quill.on("text-change", () => {
//         const html = quill.root.innerHTML;
//         setInput(html);
//       });
//     }
//   }, [quill]);

//   return (
//     <div style={{ background: "white" }}>
//       <div ref={quillRef} />
//     </div>
//   );
// };

// export default RichTextEditor;