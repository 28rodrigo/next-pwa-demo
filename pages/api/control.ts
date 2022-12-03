// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'
import path from 'path';
import { promises as fs } from 'fs';
import mqtt from 'mqtt'
const host = '192.168.1.107'
const port = '1883'
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

        const jsonDirectory = path.join(process.cwd(), 'json');
        const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
        var old_state=JSON.parse(fileContents) as DataBody;

        if(old_state.effect==body.effect && old_state.power==body.power)
            res.status(200).json({status:"Not changed"})
        else{
            if(body.power==0)
            {
                publish("light","power:0;effect:0")
                fs.writeFile(jsonDirectory + '/data.json', JSON.stringify(body), { flag: 'w+' });
            }    
            else if (body.power==1 && old_state.power==0) {
                //turn on light
                //set effect=1
                publish("light","power:1;effect:1")
                //guardar no ficheiro
                fs.writeFile(jsonDirectory + '/data.json', JSON.stringify(body), { flag: 'w+' });
            }else{
                publish("light","power:1;effect:"+body.effect.toString());
                fs.writeFile(jsonDirectory + '/data.json', JSON.stringify(body), { flag: 'w+' });
            
            }
            res.status(200).json({status:'OK'})
        }


      } else {
        res.status(412);
      }
  
}


