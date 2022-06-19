import axios from 'axios';

const methodNotAllow = {
  errorCode: 405,
  msg: 'Method not Allow',
}

const getListSenators = async () => {
  const api = 'https://legis.senado.leg.br/dadosabertos';
  const url = `${api}/senador/lista/atual`;
  const senators = await axios.get(url);
  return senators
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const senators = await getListSenators();
    const data = senators.data.ListaParlamentarEmExercicio
    res.status(200).json(data)
  } else {
    res.status(405).json(methodNotAllow)
  }
}
