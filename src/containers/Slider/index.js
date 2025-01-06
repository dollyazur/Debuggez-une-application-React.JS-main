import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// départ à zéro, premiere card affichée

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // de la plus ancienne à la plus récente

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  )|| [];

// calcul "longueur" totale avec lenght, , ajout d'une image à chaque 5secondes , arrivé au bout, retour au départ (0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  
 // on affiche bien la bonne image si l'index correspond à idx (display), sinon hide
        
        return (
          <div className="SlideCardList">
            {byDateDesc.map((event, idx) => (
              <div
                key={event.title}
                className={`SlideCard SlideCard--${
                  index === idx ? "display" : "hide"
                }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          ))}


          
          <div className="SlideCard__paginationContainer"> 
            <div className="SlideCard__pagination">
            {byDateDesc.map((event) => (
      <input
        key={`radio-${event.id}`} // chaque point est unique par son id
        type="radio"
        name="radio-button"
        checked={index === byDateDesc.indexOf(event)} // Pour vérifier si c'est le point actif
                  readOnly
                />
              ))}
            </div>
          </div>
        
    </div>
  );
};

export default Slider;
