import React from "react";
import axios from "axios";
import Link from "next/link";

import Version from "../components/Version";
import SenadorProfile from "../components/SenadorProfile";

function ListSenators({ senators, versionData }) {
  return (
    <>
      <Version {...versionData} />
      <section>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {senators.map((senator) => {
            return (
              <li
                style={{
                  width: "400px",
                  height: "300px",
                }}
                key={senator.IdentificacaoParlamentar.CodigoParlamentar}
              >
                <a
                  href={`/senador/${senator.IdentificacaoParlamentar.CodigoParlamentar}`}
                >
                  <SenadorProfile
                    IdentificacaoParlamentar={senator.IdentificacaoParlamentar}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default function Home({ senators, versionData }) {
  return (
    <div>
      <h1>Senadores</h1>
      <p>Seleciona o Parlamentar para ver suas declarações</p>
      {versionData && (
        <ListSenators senators={senators} versionData={versionData} />
      )}
    </div>
  );
}

const getListSenators = async () => {
  const api = "https://legis.senado.leg.br/dadosabertos";
  const url = `${api}/senador/lista/atual`;
  const senators = await axios.get(url);
  const data = senators.data.ListaParlamentarEmExercicio;

  return data;
};

export async function getStaticProps(context) {
  const revalidateTime = 60 * 60 * 6; // 6h
  try {
    const api = "https://legis.senado.leg.br/dadosabertos";
    const url = `${api}/senador/lista/atual`;
    const response = await axios.get(url);
    const data = response.data.ListaParlamentarEmExercicio;
    const senators = data.Parlamentares.Parlamentar;
    const versionData = data.Metadados;
    return {
      props: {
        senators,
        versionData,
      },
      revalidate: revalidateTime,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        senators: [],
        versionData: null,
      },
      revalidate: revalidateTime,
    };
  }
}
