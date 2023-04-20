const express = require("express");
const morgan = require("morgan");



const app = express();

app.set("case sensitive routing", true)



app.use(morgan("dev"));
let products = [
  {
    id: 1,
    name: "laptop",
    price: "3000",
  },
];



//añadiremos el middleware para que el servidor entienda el json que el usuario envía

app.use(express.json());

app.set("appName", "Coffee App");


//crearemos varias rutas que nos van a permitir guardar datos

//si quiero crear una ruta que respete el las mayusculas

app.get("/UserName",(req, res) =>{
  res.send("Username route")
})


app.get("/products", (req, res) => {
  res.json(products);
});

//para efectos pedagogicos y para entender el concepto del modelo cliente servidor usaremos un arreglo para ver como funcionan las peticiones, pero en realidad se usa una base de datos

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

app.put("/products", (req, res) => {});

//cuando quiera eliminar algo debo comprobar si el producto existe
app.delete("/products/:id", (req, res) => {
  const productFound = products.find((products) => {
    //esto nso retornara un arreglo vacio
    return products.id === parseInt(req.params.id);
  });

  //esta es la respuesta si no se encuentra el elemento buscado por el ID

  if (!productFound)
    //ademas dira el codigo del error, el 404
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.filter((p) => p.id !== parseInt(req.params.id));
  //204, todo ha ido bien pero no le estoy respondiendo nada al cliente
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  const productFound = products.find((products) => {
    return products.id === parseInt(req.params.id);
  });

  //esta es la respuesta si no se encuentra el elemento buscado por el ID

  if (!productFound)
    //ademas dira el codigo del error, el 404
    return res.status(404).json({
      message: "Product not found",
    });

  res.json(productFound);
});

app.listen(3000);

console.log(`server ${app.get("appName")} on port ${3000}`);
