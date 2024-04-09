let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://oshaddissanayake1997:<password>@cluster0.hm3yhqv.mongodb.net/";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('marval');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/api/marval', (req,res) => {
    getAllMarval((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get successful'});
        }
    });
});

app.post('/api/marval', (req,res)=>{
    let marval = req.body;
    postMarval(marval, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postMarval(marval,callback) {
    collection.insertOne(marval,callback);
}

function getAllMarval(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, () => {
    console.log('server started');
    runDBConnection();
});