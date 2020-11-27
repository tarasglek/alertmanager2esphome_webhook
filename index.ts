import * as express from 'express'
import * as request from 'request'
const app = express()
const port = 9000
app.use(express.json());

app.post('/alert', (req, res) => {
    let totalBody = ""
    for (let alert of req.body.alerts) {
        console.log(alert)
        let destURL:string = ""
        let status = alert.status // firing or resolved
        try {
            destURL = alert.annotations[status]
        } catch(e) {
            continue;
        }
        
        const options = {
            url: destURL,
            method: alert.annotations.method
        };
        console.log(options)

        request(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${res.statusCode}`);
            console.log(body);
            totalBody += body
        });
    }
    res.send(totalBody)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})