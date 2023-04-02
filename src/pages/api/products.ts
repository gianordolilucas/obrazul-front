import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Defina a Variável de ambiente NEXT_PUBLIC_API_URL.");
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL)
  const data = await response.json()
  
  res.status(200).json(data)
}

export default handler
