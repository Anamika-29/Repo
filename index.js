let express = require("express");
let app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, OUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.listen(process.env.PORT||2410,()=>{
    console.log("app is running")
})
let {customersData} = require("./customersData.js");
app.get("/test",function (req, res){
    res.send("Test Response");
})


app.get("/customers", function(req,res){
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    let sortBy = req.query.sortBy;
    let arr1 = customersData;
  
    if(city){
        arr1 = arr1.filter(st=>st.city===city); 
    }
    if(gender){
        arr1 = arr1.filter(st=>st.gender===gender); 
    }
    if(payment){
        arr1 = arr1.filter(st=>st.payment===payment); 
    }
    if(sortBy==="city"){
                arr1.sort((p1,p2)=>p1.city.localeCompare(p2.city));
            }
            if(sortBy==="age"){
                arr1.sort((p1,p2)=>p1.age-p2.age);
            }
            if(sortBy==="payment"){
                arr1.sort((p1,p2)=>p1.payment.localeCompare(p2.payment));
            }


    res.send(arr1);
})
app.get("/customers/:id" , function(req,res){
    let id = req.params.id;
    let customer = customersData.find(ele=>ele.id===id);
    res.send(customer);
})

app.post("/customers" , function(req,res){
    let body = req.body;

customersData.push(body);
res.send(customersData);

});

app.put("/customers/:id" , function(req,res){
    let id = req.params.id;
    let body = req.body;
    let index = customersData.findIndex(st=>st.id===id);
    if(index>=0){
    customersData[index] = body;
    
res.send(body);
}
else{
    res.status(404).send("No customer found");
}

});




app.delete("/customers/:id" , function(req,res){
    let id = req.params.id;
    
    let index = customersData.findIndex(st=>st.id===id);
    if(index>=0){

    let deletedCustomer = customersData.splice(index,1);
    
res.send(deletedCustomer);
}
else{
    res.status(404).send("No customer found");
}

});

