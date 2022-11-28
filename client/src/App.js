import { useCallback, useState } from "react";
import "./App.css";
import SingleNews from "./SingleNews";

function App() {
  const [state, setState] = useState({
    openRate: 0,
    readRate: 0,
    news: [
      {
        id: 1,
        title: "Новость 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, voluptates!",
        isOpen: false,
        wasRead: false,
      },
      {
        id: 2,
        title: "Новость 2",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, voluptates! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, voluptates!",
        isOpen: false,
        wasRead: false,
      },
    ],
  });

  const onOpenNews = useCallback(
    (newsId) => {
      //изменяем состояние isOpen на противоположное
      setState((prevState) => {
        const newStateOfNews = prevState.news.map(
          (obj) => {
            if (obj.id === newsId) {
              return { ...obj, isOpen: !obj.isOpen };
            }
            return obj;
          },
          [newsId]
        );

        //возвращаем объект с новым измененным news:
        return {
          ...prevState,
          news: Object.assign(prevState.news, newStateOfNews), //целевой объект и ресурсный
        };
      });

      // если новость открылась, прибавляем openRate +1
      const index = state.news.findIndex((el) => el.id === newsId);
      setState((prevState) => {
        if (prevState.news[index].isOpen === true) {
          return { ...prevState, openRate: (prevState.openRate += 1) };
        } else {
          return prevState;
        }
      });
    },
    [state.news]
  );

 

  //пометить новость прочитанной
  const onReadedNews = useCallback((newsId, status) => {
    setState((prev) => {
      const newStateOfNews = prev.news.map((el) => {
        if (el.id === newsId) {
          return { ...el, wasRead: status };
        }
        return el;
      });
      
          return {
            ...prev,
            news: Object.assign(prev.news, newStateOfNews)
          }
    });

  //увеличиваем readRate
 setState((prevState)=> ({
  ...prevState,
readRate:
status === true
? (prevState.readRate +=1) 
: (prevState.readRate -=1)
 }))
  },[]);

  return (
    <>
      <div>
        <h1>Список новостей </h1>
        <hr />
        <span>
          Открыто <strong>{state.openRate}</strong> | Прочитанных новостей:{state.readRate}
        </span>
      </div>

      {state.news.map((singleNewsData) => (
        <SingleNews
          key={singleNewsData.id}
          id={singleNewsData.id}
          title={singleNewsData.title}
          text={singleNewsData.text}
          isOpen={singleNewsData.isOpen}
          wasRead={singleNewsData.wasRead}
          setOpenNews={onOpenNews}
          setReadedNews={onReadedNews}
        />
      ))}
    </>
  );
}

export default App;
