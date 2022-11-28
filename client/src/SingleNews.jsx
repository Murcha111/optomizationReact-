import React, { useEffect } from "react";

const SingleNews = ({
  id,
  title,
  text,
  wasRead,
  isOpen,
  setOpenNews,
  setReadedNews,
}) => {
  useEffect(() => {
    console.log("\n====================================");
    console.log(`Rerender component with title: =>| ${title} |<= `);
    console.log("====================================\n");
  });

  return (
    <div className="card">
      <h3>{title}</h3>
      {!wasRead ? (
        <button onClick={() => setOpenNews(id)}>
          {isOpen ? "закрыть" : "открыть"}
        </button>
      ) : (
        <>
          <span>{text}</span>
          <hr />
          <button
            className="didntReadedButton"
            onClick={() => setReadedNews(id, false)}
          >
            {"оставить непрочитанной"}
          </button>
        </>
      )}

      {isOpen && !wasRead ? (
        <div>
          <span>{text}</span>
          <hr />
          {!wasRead ? (
            <button onClick={() => setReadedNews(id, true)}>прочитать</button>
          ) : null}
        </div>
      ) : null}
      {isOpen && wasRead ? ( <div>
         
          
        <button onClick={() => setOpenNews(id)}>
        закрыть 
        </button>
        </div>): null}
    </div>
  );
};

export default React.memo(SingleNews);
