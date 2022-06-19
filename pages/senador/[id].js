import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import Version from "../../components/Version";
import SenadorProfile from "../../components/SenadorProfile";

export default function Senador(props) {
  return (
    <>
      <h1>Apartes</h1>
      <SenadorProfile
        IdentificacaoParlamentar={props.discursos.IdentificacaoParlamentar}
      />
      <Version {...props.versionData} />
      {props.discursos.Apartes.Aparte.map((item) => {
        return (
          <div key={item.CodigoPronunciamento}>
            <h3>Data: {item.SessaoPlenaria.DataSessao}</h3>
            <p>{item.TextoResumo}</p>
            <a target={"_blank"} href={item.UrlTexto}>
              Ver texto completo
            </a>
          </div>
        );
      })}
      <div></div>
    </>
  );
}
const api = "https://legis.senado.leg.br/dadosabertos";

const getListDiscursos = async (IdentificacaoParlamentar) => {
  const url = `${api}/senador/${IdentificacaoParlamentar}/apartes`;
  const { data } = await axios.get(url);
  return data.ApartesParlamentar;
};

export async function getServerSideProps(context) {
  const revalidateTime = 1; //60 * 60 * 6; // 6h
  try {
    const data = await getListDiscursos(context.params.id);
    const discursos = data.Parlamentar;
    const versionData = data.Metadados;
    return {
      props: {
        discursos,
        versionData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        discursos: [],
        versionData: null,
      },
    };
  }
}
