import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav
        style={{
          margin: 10,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <Link href="/">Inicio</Link>
        </div>
        <div>
          <Link href="/sessoes">Sessões</Link>
        </div>
        <div>
          <Link href="/senadores">Senadores</Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
