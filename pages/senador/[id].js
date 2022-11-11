import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import Version from "../../components/Version";
import SenadorProfile from "../../components/SenadorProfile";
/*
 <h3>{senator.IdentificacaoParlamentar.SiglaPartidoParlamentar}</h3>

      */
function Header(props) {
  console.log(props.discursos.IdentificacaoParlamentar);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
        background: "#FAAFAA",
      }}
    >
      <h1>Apartes</h1>
      <SenadorProfile
        IdentificacaoParlamentar={props.discursos.IdentificacaoParlamentar}
      />

      <div>
        <h3>
          {props.discursos.IdentificacaoParlamentar.SiglaPartidoParlamentar}
        </h3>
      </div>
    </div>
  );
}

function Pronunciamento(props) {
  const item = props.item;
  if (!item.CodigoPronunciamento) {
    return null;
  }
  if (!item.SessaoPlenaria) {
    return null;
  }
  if (!item.SessaoPlenaria.DataSessao) {
    return null;
  }

  return (
    <div key={item.CodigoPronunciamento}>
      <h3>Data: {item.SessaoPlenaria.DataSessao}</h3>
      <p>{item.TextoResumo}</p>
      <a target={"_blank"} href={item.UrlTexto}>
        Ver texto completo
      </a>
    </div>
  );
}

function ListPronunciamento(props) {
  const list = props.list;

  if (list.length === 0) {
    return <div>Lista vazia</div>;
  }
  return (
    <>
      {list.map((item) => {
        return <Pronunciamento item={item} />;
      })}
    </>
  );
}

export default function Senador(props) {
  return (
    <>
      <Header discursos={props.discursos} />
      <Version {...props.versionData} />
      <ListPronunciamento list={props.discursos.Apartes.Aparte} />
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
