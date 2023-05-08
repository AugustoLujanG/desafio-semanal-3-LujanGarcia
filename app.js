import express from "express";
import ProductManager from "./productManager.js";

// Crea una instancia de ProductManager

const productManager = new ProductManager("products.json");

// Llamar al método addProduct con los campos especificados

const prodcut1 = {
  title: "Producto prueba 1",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "Producto1",
  stock: 25,
};

const product2 = {
  title: "Producto prueba 2",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto2",
  stock: 100,
};

const product3 = {
  title: "Producto prueba 3",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto3",
  stock: 100,
};

const product4 = {
  title: "Producto prueba 4",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto4",
  stock: 100,
};

const product5 = {
  title: "Producto prueba 5",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto5",
  stock: 100,
};

const product6 = {
  title: "Producto prueba 6",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto6",
  stock: 100,
};

const product7 = {
  title: "Producto prueba 7",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto7",
  stock: 100,
};

const product8 = {
  title: "Producto prueba 8",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto8",
  stock: 100,
};

const product9 = {
  title: "Producto prueba 9",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto9",
  stock: 100,
};

const product10 = {
  title: "Producto prueba 10",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "Producto10",
  stock: 100,
};

productManager.addProduct(prodcut1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);
productManager.addProduct(product7);
productManager.addProduct(product8);
productManager.addProduct(product9);
productManager.addProduct(product10);

const app = express();
const PORT = 8080;

// Endpoint para obtener un límite de productos recibido como query

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener un producto por su ID recibido por param

app.get("/products/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.getProductById(parseInt(id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

