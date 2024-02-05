import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ); 

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const lastIndex = byDateDesc ? byDateDesc.length - 1 : 0;
        return prevIndex < lastIndex ? prevIndex + 1 : 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [byDateDesc]);



  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`event-${event.date}`} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3 data-testid='slide-title'>{event.title}</h3>
              <p>{event.description}</p>
              <div data-testid='slide-mois'>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input key={`radio-${event.date}`} type="radio" name="radio-button" checked={index === radioIdx} readOnly/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;