const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const app = express();
process.env.PWD = process.cwd();
app.use(express.static(__dirname + '/views/resurse/'));
app.use(express.static(__dirname + '/views/css/'));
app.use(express.static(__dirname + '/views/js/'));
const fs =require('fs');
const port = 6789;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var oracledb=require('oracledb');
oracledb.autoCommit=true;
var SimpleOracleDB=require('simple-oracledb');
oracledb.outFormat = oracledb.ARRAY;
SimpleOracleDB.extend(oracledb);
var async=require('async');

app.get('/', (req, res) => {
	res.render('index');
});
app.get('/despre',(req,res)=>{
    res.render('despre');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});
app.get('/echipa',(req,res)=>{
    res.render('echipa');
});
app.get('/adoptie',(req,res)=>{
    fs.readFile('adoptie.json',(err,data)=>{
        if(err) console.log(err);
        const listaAnimale=JSON.parse(data);
        res.render('adoptie',{animalee:listaAnimale});
    });
    
});
app.get('/programare',(req,res)=>{
    res.render('programare');
});
app.post('/verificare-rezervare',function(req,res){
    if(typeof req.body.nume!=undefined && req.body.prenume!=undefined && req.body.numar!=undefined)
    {
        oracledb.getConnection(
            {
                user:"C##PW",
                password:"pw",
                connectString: "localhost/xe"
            },
            function(err,connection)
            {
                if(err) { 
                    console.error(err);
                     return;
                    }
                    nume=req.body.nume;
                    prenume=req.body.prenume;
                    tel=req.body.numar;
                    data=new Date(req.body.date);
                    numetable="PERS";
                    console.log(data);
                    //cod pentru afisare 
                    //SELECT *
                    //FROM pers
                    //ORDER BY nume;
                connection.batchInsert(
                    "INSERT INTO "+numetable+" VALUES(:nume,:prenume,:telefon,:datar)",
                    [{nume:nume,prenume:prenume,telefon:tel,datar:data}],
                    {autoCommit:true} ,
                    function(err, result)
                    {
                        if(err) {
                            console.error(err); 
                            doRelease(connection);
                            return;
                        }
                        console.log(result.metaData);
                        console.log(result.rows);
                        doRelease(connection);
                    });
            });
        function doRelease(connection) {  
            connection.release(  
                function(err) {  
                  if (err) {console.error(err.message);}  
                }  
                );  
            }
            console.log('S-a inserat in baza de date');
            res.redirect("/programare");
            return;
    }
   
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`+port));