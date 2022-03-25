import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import './Home.css';

export function Home() {
  const [animal, setAnimal] = useState<IAnimal[]>([]);

  axios
    .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
    .then((response) => {
      localStorage.setItem("Animals", JSON.stringify(animal));
      setAnimal(response.data);
    });

  let animalApi = animal.map((animal: IAnimal) => {
    let animalLink = `/animal/${animal.id}`;
    return (
      <div key={animal.id}>
        <Link to={animalLink}>{animal.name}</Link>
        <p>{animal.shortDescription}</p>
      </div>
    );
  });

  return <>{animalApi}</>;
}
