import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

//THe Main component includes weatherCard, ItemCard compoments
function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;

/* wraping items in curly braces allows you to escape back to JS*/
/*the key always needs to go on the outermost piece of the markup you are renduring 
(if it is a component, it goes in the component) */

/*We are passing 'handleCardClick' as a prop from the <main /> component in App.jsx and then we are destructuring the prop inside the main component in Main.jsx
/*We then need to pas it as a prop through the component we want it to get to (ItemCard) and call it onCardClick (DIFF from onClick) */
/*Lastly, we destructure it in ItemModal.jsx" */
