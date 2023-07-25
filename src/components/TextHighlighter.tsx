type TextHighlighterProps = {
  text: string;
  search: string;
};

export const TextHighlighter = ({ text, search }: TextHighlighterProps) => {
  const splitText = text.split(new RegExp(`(${search})`, "gi"));

  return (
    <>
      {splitText.map((text, index) =>
        text.toLowerCase() === search.toLowerCase() ? (
          <mark key={index + text}>{text}</mark>
        ) : (
          text
        )
      )}
    </>
  );
};
