import express from 'express'
import cors from 'cors'
import {XMLParser} from 'fast-xml-parser'
const parser = new XMLParser();
const corsMiddleware = cors();
const jsonMiddleware = express.json();
const api = express();

api.use(corsMiddleware);
api.use(jsonMiddleware);
api.post('/test', async (req, res) => {
    const { email } = req.body;

    const apiUrl = 'https://api.identityprotection-services.com/EnfortraV1.06.asmx';

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
       <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
         <soap12:Body>
           <GetFullCreditReport xmlns="https://api.identityprotection-services.com">
               <APILoginName>APIScoreTribe@enfotra.com</APILoginName>
               <APILoginPassword>DeSA4a736pnBqzwjC9WQME</APILoginPassword>
               <UserEmailAddress>${email}</UserEmailAddress>
               <OutputType>JSON</OutputType>
               <ErrMsg></ErrMsg>
           </GetFullCreditReport>
         </soap12:Body>
       </soap12:Envelope>`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
        },
        body: soapRequest,
    })
    const data = await response.text()
    const parsed = parser.parse(data);
    const string = parsed['soap:Envelope']['soap:Body'].GetFullCreditReportResponse.GetFullCreditReportResult;
    const json = JSON.parse(string);
    console.log(json)
    res.send(json)
})
const port = 4000;
api.listen(port, () => {
    const message = 'Listening on 4000'
    console.log(message)
})
