import React from "react";
import axios from "axios";

function ListSenators({ senators, versionData }) {
  return (
    <>
      <section>
        <h4>Ultima atualização: {versionData.Versao}</h4>
      </section>
      <section>
        <ul>
          {senators.map((senator) => {
            return (
              <li key={senator.IdentificacaoParlamentar.CodigoParlamentar}>
                <img
                  src={senator.IdentificacaoParlamentar.UrlFotoParlamentar}
                  alt={`foto de perfil ${senator.IdentificacaoParlamentar.FormaTratamento} ${senator.IdentificacaoParlamentar.NomeCompletoParlamentar}`}
                  width={200}
                  height={200}
                />
                <div>
                  {senator.IdentificacaoParlamentar.NomeParlamentar} -{" "}
                  {senator.IdentificacaoParlamentar.SiglaPartidoParlamentar}
                </div>
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
      <h1>Boas vindas ao projeto Falou</h1>
      <p>
        O projeto Falou tem como objetivo mapear te organizar tudo que os
        senadores do Brasil falaram durante seu mandato
      </p>
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
      revalidate: 60,
    };
  } catch (err) {
    console.log(err)
    return {
      props: {
        senators: [],
        versionData: null,
      },
      revalidate: 60,
    };
  }
}
