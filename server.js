 const express = require("express")
 const app = express()
 app.use(express.json())

 let array = []

 app.get('/',(req,res)=>{
    res.send({"messege":" this is test api for expreess js "})
 })

  
 app.post('/items', (req, res) => {
    const newItems = {
        id: array.length + 1,
        name: req.body.name,  
        desc: req.body.desc, 
        person: {
            age: req.body.person.age,  
            gender: req.body.person.gender,  
            address: {
                city: req.body.person.address.city,   
                area: req.body.person?.address?.area  
            }
        },
        test: {
            firstName: req.body.test.firstName,  
            lastName: req.body.test.lastName  
        }
    };
    array.push(newItems);
    res.status(201).json({
        message: "Data is created successfully",
        data: newItems
    });
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);  
    console.log("ID --->", id);
    const items = array.find(item => item.id === id);
   console.log("item :::",items)
    if (!items) {
       
        return res.status(404).json({
            message: "Item not found"
        });
    }
    res.status(200).json({
        message: "Data successfully retrieved by ID",
        data: items
    });
});


app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);  
    const index = array.findIndex(item => item.id === id);
    if (!index) {
        return res.status(404).json({
            message: "ID does not exist"
        });
    }
    array[index] = {
        ...array[index],  
        ...req.body, 
        person: {
            ...array[index].person, 
            ...req.body.person, 
            address: {
                ...array[index].person.address, 
                ...req.body.person?.address  
            }
        },
        test: {
            ...array[index].test,  
            ...req.body.test 
        }
    };

    

    res.status(200).json({
        message: 'Successfully Updated',
        updatedItem: array[index]
    });
});



app.get('/items',(req,res)=>{
    res.status(201).json({
        messege: " Data  successfully get",
        data: array
    })
})

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = array.findIndex(item => item.id === id);

    if (index === -1) {  
        return res.status(404).json({
            message: "ID not found"
        });
    }

    // Remove the item from the array
    array.splice(index, 1);

    res.status(200).json({
        message: "Data successfully deleted",
        data: array 
    });
});

 app.listen(300,()=>{
    console.log(" app is listen on port 300")
 })