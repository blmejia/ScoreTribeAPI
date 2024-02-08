"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fast_xml_parser_1 = require("fast-xml-parser");
const parser = new fast_xml_parser_1.XMLParser();
const corsMiddleware = (0, cors_1.default)();
const jsonMiddleware = express_1.default.json();
const api = (0, express_1.default)();
api.use(corsMiddleware);
api.use(jsonMiddleware);
api.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://api.identityprotection-services.com/EnfortraV1.06.asmx';
    //const loginPassword = 'DeSA4a736pnBqzwjC9WQME';
    // const memberId = 'Scoretribe';
    // const partnerId = '157';
    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
       <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
         <soap12:Body>
           <GetFullCreditReport xmlns="https://api.identityprotection-services.com">
               <APILoginName>APIScoreTribe@enfotra.com</APILoginName>
               <APILoginPassword>DeSA4a736pnBqzwjC9WQME</APILoginPassword>
               <UserEmailAddress>blmejia4@gmail.com</UserEmailAddress>
               <OutputType>JSON</OutputType>
               <ErrMsg></ErrMsg>
           </GetFullCreditReport>
         </soap12:Body>
       </soap12:Envelope>`;
    const response = yield fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            //'Host': '<calculated when request is sent>',
            //'API-Key': apiKey,
            //'SOAPAction': 'https://api.identityprotection-services.com/GetFullCreditReport'
        },
        body: soapRequest,
    });
    //console.log('Response', response)
    const data = yield response.text();
    const parsed = parser.parse(data);
    const string = parsed['soap:Envelope']['soap:Body'].GetFullCreditReportResponse.GetFullCreditReportResult;
    const json = JSON.parse(string);
    console.log(json);
    res.send(json);
}));
const port = 4000;
api.listen(port, () => {
    const message = 'Listening on 4000';
    console.log(message);
});
