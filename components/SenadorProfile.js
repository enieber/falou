import React from "react";
import SenadorImage from "./SenadorImage";

export default function SenadorProfile({ IdentificacaoParlamentar }) {
  return (
    <div>
      <SenadorImage IdentificacaoParlamentar={IdentificacaoParlamentar} />
      <div>
        {IdentificacaoParlamentar.NomeParlamentar} -{" "}
        {IdentificacaoParlamentar.SiglaPartidoParlamentar}
      </div>
    </div>
  );
}
