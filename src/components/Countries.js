import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  //   stock les datas de l'api et charge l'état
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);

  // base de donnée pour les boutons radio "continent"
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // stocke le nom de la valeur continent
  const [selectedRadio, setSelectedRadio] = useState("");

  // le useEffect se joue lorsque le composant est monté
  useEffect(() => {
    // requéte a la base de données restcountries
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent, id) => (
          <li key={id}>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {/* // si selectedRadio est true le boutton s'affiche , le state surveille en temps réel  */}
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la rechercher
        </button>
      )}
      <ul>
        {data
          // le filter filtre tous  les pays qui ont comme nom de continent la méme valeur du bouton radio
          .filter((country) => country.continents[0].includes(selectedRadio))
          // le sort filtre les pays   en ordre décroissant
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
