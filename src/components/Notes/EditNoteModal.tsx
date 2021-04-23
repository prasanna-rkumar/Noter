import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";
import ReactQuill from "react-quill";
import deleteNote from "../../firebase/dbhelpers/deleteNote";
import updateNote from "../../firebase/dbhelpers/updateNote";
import Note from "../../interfaces/note.interface";
import debounce from "../../utils/debounce";
import removeHTMLTags from "../../utils/removeHTMLTags";

const processChanges = debounce(({ id, title, content }: Note) => {
  if (removeHTMLTags(content).trim() === "") content = "";
  updateNote({
    id,
    title,
    content,
  });
}, 1500);

interface Props {
  item: Note;
  onClick: any;
}

const EditNoteModal: FC<Props> = ({ item, onClick }: Props) => {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [isFullScreen, setFullScreen] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  // const contentRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const listener = function () {
      setFullScreen(document.fullscreenElement !== null);
    };
    const editorElem = editorRef.current;
    editorElem?.addEventListener("fullscreenchange", listener);
    return () => {
      editorElem?.removeEventListener("fullscreenchange", listener);
    };
  }, [editorRef]);

  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-30 px-1"
      onClick={onClick}
    >
      <motion.div
        ref={editorRef}
        layoutId={item.id}
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="editor-container border-2 relative border-gray-200 rounded-md py-3 px-1 md:px-4 bg-white w-full max-w-2xl flex flex-col items-stretch shadow-lg"
      >
        <div className="flex flex-row justify-between items-start">
          <input
            ref={titleRef}
            className="font-semibold text-xl mb-2.5 outline-none flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyUp={(e) => {
              processChanges({ id: item.id, title, content });
            }}
            placeholder="Title"
          />
          <button
            onClick={() => {
              if (!isFullScreen) {
                editorRef.current?.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
          >
            {isFullScreen ? (
              <RiFullscreenExitLine size={24} />
            ) : (
              <RiFullscreenFill size={24} />
            )}
          </button>
        </div>
        <ReactQuill
          value={content}
          onChange={(html) => {
            setContent(html);
            processChanges({ id: item.id, title, content: html });
          }}
          placeholder="Make a Note..."
        />
        {/* <textarea
          ref={contentRef}
          className="resize-none outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={(e) => {
            processChanges({ id: item.id, title, content });
          }}
          placeholder="Make a Note..."
        /> */}
        <div className="h-10 w-full transition-opacity duration-200">
          <div className="flex items-center justify-end px-3 note-toolbar absolute w-full h-10 bottom-0 left-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(item);
                onClick();
              }}
              className="rounded-full hover:bg-gray-200 p-2"
            >
              <AiOutlineDelete size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditNoteModal;
