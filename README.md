# Optimizing Nodejs app`s performance with clustering

- required `node`

#### i'm use `node` `18.16.0`

- run 
    - `node src/cluster.js`

### install `vegeta` for attack request

- installation 

```bash
cd ~/Downloads
wget https://github.com/tsenart/vegeta/releases/download/v12.8.3/vegeta-12.8.3-linux-amd64.tar.gz
tar -zxvf vegeta-12.8.3-linux-amd64.tar.gz
chmod +x vegeta
./vegeta --version
```

### output this command `echo "GET http://localhost:8000/api/slow" | ./vegeta attack -duration=10s -rate=50 | ./vegeta report --type=text`

<img src="img/print-terminal.png"  alt="Print Terminal"/>

### output node running apt port 8000

<img src="img/print-node-running.png" alt="Print Node">

### time of API

<img src="img/slow-api.png" alt="Time of API">

### result number

<img src="img/slow.png" alt="Result number">