const express= require("express")
const {createItem,readItems,updateItem,deleteItem} = require("./crud.js")
const app=express();
app.use (express.json())
app.get('/items',(req,res)=>{
    readItems((err,rows)=>{
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).json(rows)
        }
    })
})
app.post('/items',(req,res)=>{
    const {name,description}= req.body
    createItem(name,description,(err,data)=>{
        if (err){
            res.status(500).send(err.message)
        }else{
            res.status(200).send (`item is added ID:${data.id}`)
        }
    })
})
app.put ('/items/:id',(res,req)=>{
    const {name,description}=req.body;
    updateItem(req.params.id,name,description,(err)=>{
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).send("update item")
        }
    })
})
app.delete ('/items/:id',(res,req)=>{
    
    deleteItem(req.params.id,(err)=>{
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).send("deleted")
        }
    })
})
app.listen(3000,()=>{
    console.log("server is running")
})