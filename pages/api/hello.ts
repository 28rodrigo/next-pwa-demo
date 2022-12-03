// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
import mqtt from 'mqtt'
const host = 'lightsdrix.tplinkdns.com'
const port = '18832'
const clientId = 'mqtt_server'

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'rodrigo',
  password: 'lk3xpo4c',
  reconnectPeriod: 1000,
})

client.on('connect', () => {
    console.log("connected")
  })


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
