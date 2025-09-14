import React from "react";

export default function TypingText({ text, className }) {
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => {
    let current = "";
    const id = setInterval(() => {
      if (current.length < text.length) {
        current = text.slice(0, current.length + 1);
        setDisplayed(current);
      } else {
        clearInterval(id);
      }
    }, 40);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className={className} style={{ whiteSpace: "pre-wrap", minHeight: "3.5rem" }}>
      {displayed}
      <span className="animate-pulse">|</span>
    </p>
  );
}
