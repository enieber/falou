import React from "react";
import axios from "axios";

export default function Home({ senators, versionData }) {
  console.log(senators);
  return (
    <div>
      <h1>Boas vindas ao projeto Falou</h1>
      <p>
        O projeto Falou tem como objetivo mapear te organizar tudo que os
        senadores do Brasil falaram durante seu mandato
      </p>
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
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get("http://localhost:3000/api/senators");
    const senators = response.data.Parlamentares.Parlamentar;
    const versionData = response.data.Metadados;
    return {
      props: {
        senators,
        versionData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        senators: [],
        versionData: null,
      },
    };
  }
}
