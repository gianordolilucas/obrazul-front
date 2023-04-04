import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(" NEXT_PUBLIC_API_URL não foi definida");
  }
  const { search } = req.query;
  

  if (!search || typeof search !== "string") {
    return res.status(400).json({ message: "Faltou 'search', ele é obrigatório." });
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/?search=${search}`)
  const data = await response.json()
  
  res.status(200).json(data)
}

export default handler