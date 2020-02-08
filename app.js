const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

// app.post("/success.html", (req, res) => {
//     let backBtn = req.body.backBtn;

//     if (backBtn) {
//         res.redirect(__dirname + "/");
//     }
// })

app.post("/", (req, res) => {
    let last = req.body.last;
    let first = req.body.first;
    let email = req.body.email;

    let data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }
            }
        ]
    }

    let jasonData = JSON.stringify(data);

    let options = {
        url:"https://us20.api.mailchimp.com/3.0/lists/3861c7c23f",
        method: "POST",
        headers: {
            "Authorization": "wai 46b6f5c2b2ceb928fb8977218e965ca2-us20"
        },
        body: jasonData
    };

    // console.log(last, first, email);
    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// api key
// ec841f5861c130c41a8839a6b5e428f0-us20

// audience id
// 3861c7c23f