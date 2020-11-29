import * as express from 'express'
import * as request from 'request'
const app = express()
const port = 9000
app.use(express.json());

let url_param_re = /^url_param_(.*)/
app.post('/alert', (req, res) => {
    let totalBody = ""
    for (let alert of req.body.alerts) {
        console.log(alert)
        let destURL:string = ""
        let status = alert.status // firing or resolved
        if (!(status in alert.annotations))
            continue
        destURL = alert.annotations[status]
        for (const [key, value] of Object.entries(alert.labels)) {
            let match = url_param_re.exec(key)
            if (!match)
                continue
            let param = match[1]
            let val = encodeURIComponent(value as string)
            if (destURL.indexOf('?') == -1) {
                destURL = destURL + "?"
            }
            let last_char = destURL[destURL.length - 1]
            if (!(last_char == '?' || last_char == '&'))
                destURL = destURL + "&"
            destURL += param + '=' + val
        }
        const options = {
            url: destURL,
            method: alert.annotations.method
        };

        request(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`${options.method} ${destURL} Status: ${res.statusCode}`);
            totalBody += body
        });
    }
    res.send(totalBody)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})