const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const app = express()

app.use(cors({
  origin: "https://69ce7a0246abc518d56c1e2d--jade-gelato-6410dd.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json())

const FoodModel= require("./models/Food")
mongoose.connect("mongodb+srv://admin:admin@cluster0.g0pbojz.mongodb.net/?appName=Cluster0/food")
.then(()=>console.log('Connected'))
.catch(err=>console.log(err))

// INSERT DATA

app.post("/insert",async(req,res)=>{
    const {foodName,description}=req.body;
    const food=new FoodModel({
        foodName:foodName,
        description:description
    })
    try
    {
       const result=await food.save();
       res.send(result);
       console.log(result);
    }
    catch(err)
    {
          console.log(err)
    }
})

// GET ALL DATA

app.get("/read",async(req,res)=>{
    try{
        const food=await FoodModel.find();
        res.send(food);
    }
    catch(err){
        res.send("error")
    }
})

// UPDATA DATA

app.put("/update",async(req,res)=>{
    const {newFoodName,newDescription,id}=req.body;

    try{
        const updateFood=await FoodModel.findById(id);
        if(!updateFood){
            return res.status(400).send("Data not found")
        }
    
    updateFood.foodName=newFoodName;
    updateFood.description=newDescription;
    await updateFood.save()
    res.send("Data Updated....")
}
catch(err){
    console.log(err);
}
})

//Delete data

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try
    {
        const result=await FoodModel.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).send("Food item not found")
        }
        res.send("Food item delete")
    }catch(err)
        {
            console.error(err)
        }
    })

app.listen(3001,()=>{
    console.log("Server is Running...")
})
