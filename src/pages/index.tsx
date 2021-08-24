import { GetStaticProps } from "next"; 

import { useState } from "react";
import InputMask from "react-input-mask";

import { Popup } from "../components/Popup"
import { api } from "../services/api";
import styles from './Home.module.scss'

type cepProps = {
  data: {
    id: number;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    createdAt: string;
    updatedAt: string;
  };
}

type cepProps2 = {
  id: number;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [isVisibleInformations, setIsVisibleInformations] = useState(false)
  const [isVisiblePopup, setIsVisiblePopup] = useState(false)
  const [cep, setCep] = useState("")
  const [cepObject, setCepObject] = useState({} as cepProps2)
  
  async function handleTextChange(text) {
    setIsVisibleInformations(false)
    setCep(text.target.value)
  };

  async function searchCep() {
    const regex = new RegExp("[0-9]{2}.[0-9]{3}-[0-9]{3}");
   
    if (regex.test(cep)) {
      try {
        const cepFormated = cep.replace(".", "").replace(/-/, "")

        const { data }: cepProps = await api.get(`getCep/${cepFormated}`);

        setCepObject(data)

        return setIsVisibleInformations(true)
      } catch(err) {
        
        setIsVisiblePopup(true);
        return setIsVisibleInformations(false);
      } 
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
          <p>{cepObject.localidade}, {cepObject.uf}</p>
          <p>{cepObject.bairro}</p>
          <p>{cepObject.logradouro}</p>
          <p>{cepObject.complemento}</p>
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