import * as express from 'express'
import * as request from 'request'
const app = express()
const port = 9000
app.use(express.json());

app.post('/alert', (req, expressRes) => {
    for (let alert of req.body.alerts) {
        console.log(alert)
        let destURL:string = ""
        try {
            destURL = alert.annotations.post
        } catch(e) {
            continue;
        }
        console.log(destURL)
        
        const options = {
            url: destURL,
        };

        request.post(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${res.statusCode}`);
            console.log(body);
            expressRes.status(res.statusCode)
            expressRes.send(body)
        });
    }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})