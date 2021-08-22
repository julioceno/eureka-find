import { useState } from "react";
import InputMask from "react-input-mask";

import { Popup } from "../components/Popup"
import styles from './Home.module.scss'

export default function Home() {
  const [isVisibleInformations, setIsVisibleInformations] = useState(false)
  const [isVisiblePopup, setIsVisiblePopup] = useState(false)
  const [cep, setCep] = useState("")
  
  function handleTextChange(text) {
    setIsVisibleInformations(false)
    setCep(text.target.value)
  };

  function searchCep() {
    const regex = new RegExp("[0-9]{2}.[0-9]{3}-[0-9]{3}");
  
    if (regex.test(cep)) {
      return setIsVisibleInformations(true)
    };

    setIsVisiblePopup(true)
    setIsVisibleInformations(false);
  };

  return (
    <div className={styles.homePage}>
      
      <div className={styles.input}>
        <InputMask 
          placeholder="Insira o cep desejado"
          mask="99.999-999" 
          value={cep}
          onChange={handleTextChange}
        />
        <button onClick={searchCep}>
          <img src="/search.svg" alt="Procurar"/>
        </button>
      </div>

     { isVisibleInformations &&
        <div className={styles.informations}>
          <p>{cep}</p>
          <p>Rio de Janeiro</p>
          <p>Bairro dos jardins</p>
          <p>Rua das oliveiras</p>
        </div>
      }

      { isVisiblePopup && 
        <Popup
          togglePopup={() => setIsVisiblePopup(!isVisiblePopup)}
          message="Você não passou um cep válido, por favor, tente novamente!"
        />
      }
   
    </div>
  )
}
