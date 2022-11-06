export default function Version(props) {
  
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 10,
      }}
    >
      <h4>Ultima atualização: {props.Versao}</h4>
    </section>
  );
}
