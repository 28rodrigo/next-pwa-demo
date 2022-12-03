
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'
import path from 'path';
import { promises as fs } from 'fs';

type DataResponse={
    power:number,
    effect:number
}


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  var json=JSON.parse(fileContents) as DataResponse;

  res.status(200).send(JSON.stringify(json));
}


