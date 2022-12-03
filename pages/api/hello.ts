// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { editData, getData } from '../../json/firebase'

type Data = {
  name: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var dos= await getData();
  editData({"power":1,"effect":2})
  res.status(200).send(dos)
}
