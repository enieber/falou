import Link from "next/link";

function AncorStyled(props) {
  return (
    <Link
      href={props.href}
      style={{
        textDecoration: "none",
        cursor: "pointer",
        color: "#000",
        fontSize: 16,
      }}
    >
      {props.children}
    </Link>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 20,
          borderBottom: "1px solid #000",
        }}
      >
        <AncorStyled href="/">Falou</AncorStyled>
        <AncorStyled href="/senadores">Senadores</AncorStyled>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
