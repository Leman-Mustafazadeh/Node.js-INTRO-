const  express = require("express")
const app = express()
const PORT = 5050
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const categories= [
    {
      "id": 2,
      "description": "Sweet and savory sauces relishes spreads and seasonings",
      "name": "Condiments"
    },
    {
      "id": 1,
      "description": "Soft drinks coffees teas beers and ales",
      "name": "Beverages"
    },
    {
      "id": 3,
      "description": "Desserts candies and sweet breads",
      "name": "Confections"
    },
    {
      "id": 4,
      "description": "Cheeses",
      "name": "Dairy Products"
    },
    {
      "id": 5,
      "description": "Breads crackers pasta and cereal",
      "name": "Grains/Cereals"
    },
    {
      "id": 6,
      "description": "Prepared meats",
      "name": "Meat/Poultry"
    },
    {
      "id": 7,
      "description": "Dried fruit and bean curd",
      "name": "Produce"
    },
    {
      "id": 8,
      "description": "Seaweed and fish",
      "name": "Seafood"
    }
  ]

  //errorlari dayandirmaq ucun corsdan istifade ede bielrsen

app.get("/api",(req,res)=>{
    res.send("hello world")
})
//getall categories
app.get("/api/categories",(req,res)=>{
    const {name} = req.query
    let response = name ? categories.find((x)=>x.name==name) :categories
    res.send({
        message:"success",
        data:categories
    })
})

app.get("/api/categories/:id",(req,res)=>{
    const id = req.params['id']
    const category = categories.find((x)=>x.id==id)
    if(category){
        res.send({
            message:"succes",
            data:categories
        })
    }
    else{
        res.send({
            message:"error ",
            data:null
        })
    }
    
})


//delete
app.delete("/api/categories/:id",(req,res)=>{
    const id = req.params['id']
    const idx = categories.findIndex((x)=>x.id==id);
    categories.splice(idx,1)
    res.send({
        message:"deleted",
        data:categories
    })
})

//post
app.post("/api/categories",(req,res)=>{
     const newCateq = req.body
     newCateq.id = new Date().valueOf()
     categories.push(newCateq)
     res.send({
        message:"post",
        data:newCateq

     })
})

//put
app.put("/api/categories/:id",(req,res)=>{
    const id = req.params['id']
    const updated = req.body
    updated.id = id
    let index = categories.findIndex((x)=>x.id==id)
    categories.splice(index,1,updated)
    res.send({
        message:"put",
        data:updated
    })
})

//patch
app.patch("/api/categories/:id",(req,res)=>{
    const id = req.params['id']
    const {name,desc} = req.body
    const found = categories.find((x)=>x.id==id)
    found.name = name? name :found.name
    res.send({
        message:"patch",
        data:found
    })
})



app.listen(PORT, () => {
   console.log(`Example app listening on port ${PORT}`)
   })