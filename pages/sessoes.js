import React from "react";
import axios from "axios";
import Version from "../components/Version";

const AutorPronunciamento = ({ pronunciamento }) => {
  if (pronunciamento.Partido) {
    return (
      <h5>{`${pronunciamento.TipoAutor}: ${pronunciamento.NomeAutor} - ${pronunciamento.Partido}`}</h5>
    );
  }
  return <h5>{`${pronunciamento.TipoAutor}: ${pronunciamento.NomeAutor}`}</h5>;
};

const PronunciamentoItem = (pronunciamento) => {
  return (
    <section>
      <AutorPronunciamento pronunciamento={pronunciamento} />
      <p>{pronunciamento.Resumo}</p>
      <a target={"_blank"} href={pronunciamento.TextoIntegral}>
        Ver texto completo
      </a>
    </section>
  );
};

const SessaoItem = (sessao) => {
  if (!sessao.Pronunciamentos.Pronunciamento[0]) {
    return <div>sem Pronunciamento</div>;
  }

  return (
    <>
      <h3>{`${sessao.TipoSessao} - ${sessao.DescricaoSessao}`}</h3>
      <div>Data: {sessao.DataSessao}</div>
      <div>Inicio: {sessao.HoraInicio}</div>
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
  if (!discursos) {
    return <div>Não foi possivel carregar o periodo</div>;
  }
  return (
    <div>
      <h1>Sessões</h1>
      {versionData && <Version {...versionData} />}
      {discursos.Sessao &&
        discursos.Sessao.map((sessao) => {
          return <SessaoItem key={sessao.CodigoSessao} {...sessao} />;
        })}
      }
    </div>
  );
}

const api = "https://legis.senado.leg.br/dadosabertos";

const getListDiscursos = async () => {
  const today = "20210619";
  const url = `${api}/plenario/lista/discursos/20210601/${today}`;
  const discursos = await axios.get(url);
  const data = discursos.data.DiscursosSessao;
  console.log(data);
  return data;
};

export async function getStaticProps(context) {
  const revalidateTime = 1; //60 * 60 * 6; // 6h
  try {
    const data = await getListDiscursos();
    const discursos = data.Sessoes;
    const versionData = data.Metadados;
    return {
      props: {
        discursos,
        versionData,
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
