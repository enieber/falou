import React from "react";
import axios from "axios";
import Link from "next/link";

import Version from "../components/Version";
import SenadorProfile from "../components/SenadorProfile";

function Card({ value, description }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid #000",
        padding: 10,
        borderRadius: 5,
        background: "#FFF",
        width: "30vw",
        height: "20vh",
      }}
    >
      <h3>{value}</h3>
      <h4>{description}</h4>
    </div>
  );
}

function HeaderListSenators(props) {
  const senadores = props.senators.length;
  const comissoes = props.comissoes.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
        height: "50vh",
        background: "#FAAFAA",
      }}
    >
      <Card
        value={senadores}
        description={`O Brasil tem ${senadores} senadores`}
      />
      <Card
        value={comissoes}
        description={`O senado tem ${comissoes} comissões`}
      />
    </div>
  );
}

function filterSenatorByName(word) {
  if (word) {
    const wordLowerCase = word.toLocaleLowerCase();

    return function (item) {
      const itemToSearch =
        item.IdentificacaoParlamentar.NomeParlamentar.toLocaleLowerCase();
      return itemToSearch.includes(wordLowerCase);
    };
  } else {
    return (_item) => true;
  }
}

function filterSenatorByUF(word) {
  const wordLowerCase = word.toLocaleLowerCase();
  return function (item) {
    const itemToSearch =
      item.IdentificacaoParlamentar.UfParlamentar.toLocaleLowerCase();
    return itemToSearch.includes(wordLowerCase);
  };
}

function filterSenatorByPartido(word) {
  const wordLowerCase = word.toLocaleLowerCase();
  return function (item) {
    const itemToSearch =
      item.IdentificacaoParlamentar.SiglaPartidoParlamentar.toLocaleLowerCase();
    return itemToSearch === wordLowerCase;
  };
}

const optionsSearch = {
  name: "name",
  uf: "uf",
  partido: "partido",
};

function selectFilter(option) {
  switch (option) {
    case "name": {
      return filterSenatorByName;
    }
    case "uf": {
      return filterSenatorByUF;
    }
    case "partido": {
      return filterSenatorByPartido;
    }
    default: {
      return filterSenatorByName;
    }
  }
}

function ListWithSearch(props) {
  const [list, setList] = React.useState(props.list);
  const [search, setSearch] = React.useState("");
  const [typeSearch, setTypeSearch] = React.useState(optionsSearch.name);

  React.useEffect(() => {
    if (search) {
      console.log(search);
      if (search.length >= 1) {
        const listToUpdate = props.list.filter(
          selectFilter(typeSearch)(search)
        );
        setList(listToUpdate);
      } else {
        setList(props.list);
      }
    } else {
      setList(props.list);
    }
  }, [search]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label forHTML="search">
          Pesquisar:
          <input
            id="search"
            style={{
              margin: 10,
              padding: 10,
            }}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <select
          name="Pesquisar por"
          value={typeSearch}
          onChange={(event) => setTypeSearch(event.target.value)}
        >
          <option value="name" selected>
            Por Nome
          </option>
          <option value="uf">Por Estado</option>
          <option value="partido">Por partido</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Total encontrado: {list.length}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 10,
        }}
      >
        {list.map((senator) => {
          return <Senator senator={senator} />;
        })}
      </div>
    </div>
  );
}

function DescriptionSenator({ senator }) {
  if (!senator.IdentificacaoParlamentar.Bloco) {
    return <h3>{senator.IdentificacaoParlamentar.SiglaPartidoParlamentar}</h3>;
  }
  return (
    <div>
      <h3>{senator.IdentificacaoParlamentar.SiglaPartidoParlamentar}</h3>

      <h4>{senator.IdentificacaoParlamentar.Bloco.NomeApelido}</h4>
    </div>
  );
}

function Senator(props) {
  const { senator } = props;
  return (
    <div
      style={{
        minWidth: "20vw",
        margin: 10,
        border: "1px solid #000",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
      key={senator.IdentificacaoParlamentar.CodigoParlamentar}
    >
      <a
        href={`/senador/${senator.IdentificacaoParlamentar.CodigoParlamentar}`}
      >
        <SenadorProfile
          IdentificacaoParlamentar={senator.IdentificacaoParlamentar}
        />
        <DescriptionSenator senator={senator} />
      </a>
    </div>
  );
}

function ListSenators(props) {
  const { senators, versionData, comissoes } = props;
  return (
    <>
      <HeaderListSenators senators={senators} comissoes={comissoes} />
      <Version {...versionData} />

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <ListWithSearch list={senators} />
      </section>
    </>
  );
}

export default function Home({ senators, versionData, comissoes }) {
  return (
    <div>
      {versionData && (
        <ListSenators
          senators={senators}
          versionData={versionData}
          comissoes={comissoes}
        />
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

//https://legis.senado.leg.br/dadosabertos/dados/ComissoesPermanentes.xml

const api = "https://legis.senado.leg.br/dadosabertos";

async function listaComissoes() {
  //const url = `${api}/dados/ComissoesMistasCongresso.xml`
  const url =
    "https://www.congressonacional.leg.br/dados/comissao/lista/permanente";
  //const url = `${api}/dados/comissao/lista/permanente`;
  const response = await axios.get(url);
  const data = response.data.ComissoesCongressoNacional;
  const comissoes = data.Colegiados.Colegiado;
  return comissoes;
}

async function listaSenadores() {
  const url = `${api}/senador/lista/atual`;
  const response = await axios.get(url);
  const data = response.data.ListaParlamentarEmExercicio;
  const senators = data.Parlamentares.Parlamentar;
  const versionData = data.Metadados;

  return {
    senators,
    versionData,
  };
}

export async function getStaticProps(context) {
  const revalidateTime = 60 * 60 * 12; // 12h

  const comissoes = await listaComissoes();
  const { senators, versionData } = await listaSenadores();

  try {
    return {
      props: {
        senators,
        versionData,
        comissoes,
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
