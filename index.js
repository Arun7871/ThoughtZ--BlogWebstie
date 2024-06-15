import express from "express";
import showdown from 'showdown';

const converter = new showdown.Converter();
const app = express();
const port = 3000;
var messages=[],headings=[];
app.use(express.static("public"));
app.listen(port,() =>{
    console.log("sever running on port "+port);
})
app.use(express.urlencoded({ extended: false }))
app.get("/",(req,res)=>{
    res.render("index.ejs",{headings:headings});
})
app.get("/blog.ejs",(req,res)=>{
    var id = req.query.id;
    var to1 = headings[id-1];
    var to2 = messages[id-1];
    console.log(to1);
    res.render("blog.ejs",{
        heading:to1,
        msg : to2
    })
    console.log(headings[id-1]);
    console.log(id);
})
app.get("/form.ejs",(req,res)=>{
    res.render("form.ejs");
})
app.get("/deleteForm.ejs",(req,res) => {
    res.render("deleteForm.ejs",{headings:headings});
})

app.post("/index.ejs",(req,res)=>{
    if(req.get('referer')==="http://localhost:3000/form.ejs"){
        console.log(req.get('referer'));
        headings.push(req.body.heading);
        messages.push(converter.makeHtml(req.body.content));
        res.redirect("/");
    }else{
        let ids = req.body.items;
        for(let i=0;i<ids.length;i++){
            headings.splice(ids[i]-1, 1);
            messages.splice(ids[i]-1, 1);
            res.redirect('/');
        }
    }
})