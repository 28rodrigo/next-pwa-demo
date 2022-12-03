// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'
import path from 'path';
import { promises as fs } from 'fs';
import mqtt from 'mqtt'
import { editData, getData } from '../../json/firebase';
const host = '83.132.100.226'
const port = '18832'
const clientId = 'mqtt_server'


const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'rodrigo',
  password: 'lk3xpo4c',
  reconnectPeriod: 2000,
})

client.on('connect', () => {
    console.log("connected")
  })

  function publish(topic:string,message:string)
{
  client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
}

type DataBody={
    power:number,
    effect:number
}
type DataResponse={
    status:string
}
export default async function controlLight(req: NextApiRequest,res: NextApiResponse<DataResponse>) 
{
    if (req.method === 'POST') {
        console.log(req.body)
        var body=JSON.parse(req.body) as DataBody;
        var old_state= await getData() as DataBody
        
        if(old_state.effect==body.effect && old_state.power==body.power)
            res.status(200).json({status:"Not changed"})
        else{
            if(body.power==0)
            {
                publish("light","0;0")
                editData(body)
            }    
            else if (body.power==1 && old_state.power==0) {
                //turn on light
                //set effect=1
                publish("light","1;1")
                //guardar no ficheiro
                editData(body)
            }else{
                publish("light","1;"+body.effect.toString());
                editData(body)
            
            }
            res.status(200).json({status:'OK'})
        }


      } else {
        res.status(412);
      }
  
}


