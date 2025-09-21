const express = require("express");
const productRoute = require('./routes/productRoute')

 const app = express();  
app.use(express.json());


//export // import


//mount routes (main routes)  https://localhost:8000/api/v1/products //single products
//edit on product
//delete product

//products
app.use('/api/v1/products', productRoute)

 const PORT = 8000;
 app.listen(PORT, () => console.log (`server runing on port ${PORT}`));



