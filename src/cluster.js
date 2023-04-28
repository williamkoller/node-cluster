import cluster from 'node:cluster'
import os from 'node:os'
import express from 'express'

async function bootstrap() {
  const app = express()
  console.log(`Worker ${process.pid} started`)

  app.get('/', (r, rs) => {
    rs.send('Hello World!')
  })

  app.get('/api/slow', (r, rs) => {
    console.time('slowApi');
    const baseNumber = 7;
    let result = 0;

    for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    };

    console.timeEnd('slowApi');

    console.log(`Result number is ${result} - on process ${process.pid}`);
    rs.send(`Result number is ${result}`);
  })

  app.listen(8000,  () => console.log(`App listening at port ${8000}`))
}

async function clusterize() {
  const numCPUs = os.cpus().length

  if (cluster.isMaster) {
    console.log(`Number of CPUs is ${numCPUs}`)
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting`)
      console.log(`Code ${code}`)
      console.log(`Signal: ${signal}`)
      cluster.fork()
    })
  } else {
    console.log(`Cluster server started on ${process.pid}`)
    await bootstrap()
  }
}

await clusterize()