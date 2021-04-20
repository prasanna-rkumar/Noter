import { FC, useEffect, useRef, useState } from "react";
import createNote from "../../firebase/dbhelpers/createNote";

const AddNote: FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDisabled, setDisabled] = useState(true);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (title !== "" && content !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content]);

  return (
    <div
      style={{
        boxShadow: "0 3px 7px 2px darkgrey",
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
      }}
      className="mt-28 border-2 text-left  flex flex-col items-stretch mx-auto border-gray-200 rounded-md py-3 px-4 bg-white w-full max-w-xl shadow-lg"
    >
      <input
        ref={titleRef}
        onKeyUp={(e) => {
          if (e.code === "Enter") contentRef.current?.focus();
        }}
        className="font-semibold text-base mb-2.5 outline-none"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
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
      />
      <div className="flex flex-row justify-end">
        <input
          disabled={isDisabled}
          onClick={(e) => {
            if (title !== "" && content !== "") {
              createNote({
                title,
                content,
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
