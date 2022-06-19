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

export async function getServerSideProps(context) {
  try {
    const { req, query, res, asPath, pathname } = context;
    if (req) {
      const host = req.headers.referer; 
      const response = await axios.get(`${host}api/senators`);
      const senators = response.data.Parlamentares.Parlamentar;
      const versionData = response.data.Metadados;
      return {
        props: {
          senators,
          versionData,
        },
      };
    }
    throw new Error("not found");
  } catch (err) {
    return {
      props: {
        senators: [],
        versionData: null,
      },
    };
  }
}
