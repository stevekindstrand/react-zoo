import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import './Animals.css'

export function Animals() {
  const [animalId, setAnimalId] = useState(0);
  const [animal, setAnimal] = useState<IAnimal[]>([]);
  const [feedAnimal, setFeedAnimal] = useState(false);
  const [disable, setDisable] = useState(false);


  let params = useParams();

  useEffect(() => {
    if (params.id) {
      setAnimalId(+params.id);
    }
  }, []);

  useEffect(() => {
    const animalsFromLS = localStorage.getItem("Animals");
    // console.log(animalsFromLS);
    
    if (animalsFromLS) {
      setAnimal(JSON.parse(animalsFromLS));
    }
  }, []);

  let animalApi = animal.map((animal: IAnimal) => {
    if (animalId === animal.id) {
      return (
      <div key={animal.id}>
        <img src={animal.imageUrl} />
        <p><b>Namn:</b> {animal.name}</p>
        <p><b>Född:</b> {animal.yearOfBirth}</p>
        <p><b>Om {animal.name}:</b> {animal.longDescription}</p>
        <button onClick={isFed} disabled={disable}>Mata {animal.name}</button>
        
        {feedAnimal && <div><b>{animal.name} matades:</b> {Date()}</div>}
        </div>
      )
    }
  });

  function isFed() {
    setFeedAnimal(true)
    setDisable(true)
  }

  return <>{animalApi}</>;
}
