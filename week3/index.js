import express, { request, response } from "express";

const app = express();
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.get("/", (request, respond)=>{
    respond.send("Hello from the server");
});

app.post("/", (request, respond)=>{
    respond.send("Hello from post request");
});

app.put("/", (request, respond)=>{
    respond.send("Hello from the put request");
});


/*

domain: https://www.youtube.com
endpoint: /watch

? - query object
some uid

req: { senisitive info
ip,
OS
url
query, (?) for searching information on DB 
params, body
}
 */
//example of a query 
app.get("/watch", (request, respond) => {
console.log(request.url);// watch
console.log(request.query);
console.log(request.params);
console.log(request.body);
respond.send("you got to the watch endpoint");
});


//for params
//https://www.ebay.ca/itm/316181501655
app.get("/params/:itemID", (request, respond) => {
console.log(request.url);// watch
console.log(request.query);
console.log(request.params);
console.log(request.body);
respond.send("you got to the params endpoint");
});

/*


 */