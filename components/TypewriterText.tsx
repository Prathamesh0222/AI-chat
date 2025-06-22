"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface TypewriterTextProps {
  content: string;
  onComplete?: () => void;
}

export const TypewriterText = ({
  content,
  onComplete,
}: TypewriterTextProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setIsComplete(false);
    setDisplayedContent("");

    const intervalId = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
        onComplete?.();
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [content, onComplete]);

  return (
    <div>
      <ReactMarkdown
        components={{
          code({ children, ...props }) {
            return <code {...props}>{children}</code>;
          },
          pre({ children }) {
            return (
              <pre className="overflow-x-auto w-full my-2">{children}</pre>
            );
          },
        }}
      >
        {isComplete ? content : displayedContent}
      </ReactMarkdown>
    </div>
  );
};
