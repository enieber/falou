import React from "react";

export default function SenadorImage({ IdentificacaoParlamentar }) {
  return (
    <img
      src={IdentificacaoParlamentar.UrlFotoParlamentar}
      alt={`foto de perfil ${IdentificacaoParlamentar.FormaTratamento} ${IdentificacaoParlamentar.NomeCompletoParlamentar}`}
      width={200}
      height={200}
    />
  );
}
