import { FC, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import createNote from "../../firebase/dbhelpers/createNote";

const AddNote: FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const editorContainerRef = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!editorContainerRef?.current.contains(event.target)) {
        if (!showEditor) return;
        setShowEditor(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showEditor, editorContainerRef]);

  return (
    <div
      ref={editorContainerRef}
      style={{
        boxShadow: "0 3px 3px 0 darkgrey",
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setShowEditor(true);
      }}
      className="add-note mt-28 border-2 text-left flex flex-col items-stretch mx-auto border-gray-200 rounded-md py-3 bg-white w-full max-w-xl shadow-lg"
    >
      <input
        ref={titleRef}
        onKeyUp={(e) => {
          if (e.code === "Enter") contentRef.current?.focus();
        }}
        className="font-semibold text-base mb-2.5 outline-none  px-4"
        value={title}
        placeholder={showEditor ? "Title" : "Make a note..."}
        onChange={(e) => setTitle(e.target.value)}
      />
      {showEditor && (
        <ReactQuill
          style={{
            minHeight: "4ch",
          }}
          className="w-full"
          value={content}
          placeholder="Make a note..."
          onChange={(html) => setContent(html)}
        />
      )}
      {/* <textarea
        onKeyUp={() => {
          if (contentRef.current !== null) {
            contentRef.current.style.height = "48px";
            contentRef.current.style.height =
              contentRef.current.scrollHeight + "px";
          }
        }}
        ref={contentRef}
        className="resize-none max-h-96 outline-none"
        value={content}
        placeholder="Make a note..."
        onChange={(e) => setContent(e.target.value)}
      /> */}
      <div className="flex flex-row justify-end px-4">
        <input
          disabled={title.trim() === "" || content.trim() === ""}
          onClick={(e) => {
            let trimmedTitle = title.trim(),
              trimmedContent = content.trim();
            if (trimmedTitle !== "" && trimmedContent !== "") {
              createNote({
                title: trimmedTitle,
                content: trimmedContent,
              });
              setTitle("");
              setContent("");
            }
          }}
          className="max-w-min cursor-pointer text-white bg-blue-500 disabled:opacity-50 float-right px-3 py-1 rounded "
          type="submit"
          value="Create"
        />
      </div>
    </div>
  );
};

export default AddNote;
