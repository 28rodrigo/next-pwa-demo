
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'
import path from 'path';
import { promises as fs } from 'fs';
import { getData } from '../../json/firebase';

type DataResponse={
    power:number,
    effect:number
}


export default async function handler(req:NextApiRequest, res:NextApiResponse) {


  res.status(200).send(JSON.stringify(await getData()));
}


