import React from "react";
import axios from "axios";
import Link from "next/link";

import Version from "../components/Version";
import SenadorProfile from "../components/SenadorProfile";

export default function Home() {
  return (
    <div>
      <h1>Boas vindas ao projeto Falou</h1>
      <p>
        O projeto Falou tem como objetivo mapear e organizar tudo que os
        senadores do Brasil falaram durante seu mandato
      </p>
    </div>
  );
}
