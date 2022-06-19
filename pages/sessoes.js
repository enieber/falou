import React from "react";
import axios from "axios";

const PronunciamentoItem = (pronunciamento) => {
  return (
    <section>
      <h5>{`${pronunciamento.TipoAutor} - ${pronunciamento.NomeAutor}`}</h5>
      <p>{pronunciamento.Resumo}</p>
      <a target={'_blank'} href={pronunciamento.TextoIntegral}>Ver texto completo</a>
    </section>
  );
};

const SessaoItem = (sessao) => {
  return (
    <>
      <h3>{`${sessao.TipoSessao} - ${sessao.DescricaoSessao}`}</h3>
      {sessao.Pronunciamentos.Pronunciamento &&
        sessao.Pronunciamentos.Pronunciamento.map((pronunciamento) => {
          return (
            <PronunciamentoItem
              key={pronunciamento.CodigoPronunciamento}
              {...pronunciamento}
            />
          );
        })}

      <PronunciamentoItem
        pronunciamentos={sessao.Pronunciamentos.Pronunciamento}
      />
    </>
  );
};

export default function Home({ discursos, versionData }) {
  return (
    <div>
      <h1>Falou no Feed</h1>
      {discursos.Sessao &&
        discursos.Sessao.map((sessao) => {
          return <SessaoItem key={sessao.CodigoSessao} {...sessao} />;
        })}
    </div>
  );
}

const api = "https://legis.senado.leg.br/dadosabertos";

const getListDiscursos = async () => {
  const url = `${api}/plenario/lista/discursos/20210301/20210331`;
  const discursos = await axios.get(url);
  const data = discursos.data.DiscursosSessao.Sessoes;

  return data;
};

export async function getStaticProps(context) {
  const revalidateTime = 1; //60 * 60 * 6; // 6h
  try {
    const discursos = await getListDiscursos();
    return {
      props: {
        discursos,
        versionData: null,
      },
      revalidate: revalidateTime,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        discursos: [],
        versionData: null,
      },
      revalidate: revalidateTime,
    };
  }
}
