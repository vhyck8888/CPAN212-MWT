// routers/lab_router.js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from the /lab route");
});

router.get("/name", (req, res) => {
    res.send("Vhyck Aquino");
});

router.get("/greeting", (req, res) => {
    res.send("Vhyck Aquino my student number is n01369310");
});
//localhost:8000/lab/add/2/2
router.get('/add/:x/:y', (req, res) =>{
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);

    res.send(`${x + y}`);
});

router.get('/calculate/:x/:y/:operator', (req, res) =>{
     let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);

    console.log(req.params.operator);

switch (req.params.operator) {
    case "+":
        res.send(`${x + y}`);
        break;

         case "-":
        res.send(`${x - y}`);
        break;
         case "*":

        res.send(`${x * y}`);
        break;

         case "/": //%2F
            if( y != 0){
                return res.send(`${x / y}`);
            }
        res.send(`${x + y}`);
        break;

    default:
        break;
}
})

export default router;
