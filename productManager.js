const fs = require("fs");

class ProductManager {
  constructor(fileName) {
    this.fileName = fileName;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.fileName, "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (err) {
      console.log(`Error al leer el archivo: ${err.message}`);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.fileName, JSON.stringify(this.products), "utf-8");
    } catch (err) {
      console.log(`Error al escribir archivo: ${err.message}`);
    }
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    // Validar que no se repita el código
    const codeAlreadyExists = this.products.some(
      (prod) => prod.code === product.code
    );

    if (codeAlreadyExists) {
      console.log(`Ya existe un producto con el código ${product.code}`);
      return;
    }

    // Agregar el producto al arreglo con un id autoincrementable
    const newProduct = {
      ...product,
      id: this.products[this.products.length - 1].id + 1,
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log(`Producto ${newProduct.id} - ${newProduct.title} agregado`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      console.log(`Producto ${id} no encontrado`);
      return;
    }

    this.products[productIndex] = {
      ...updatedProduct,
      id,
    };

    this.saveProducts();
    console.log(`Producto ${id} actualizado`);
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      console.log(`Producto ${id} no encontrado`);
      return;
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
    console.log(`Producto ${id} eliminado`);
  }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager("products.json");

// Llamar al método getProducts recién creada la instancia, debe devolver un arreglo vacío []
const products = productManager.getProducts();
console.log(products);

// Llamar al método addProduct con los campos especificados
const newProduct = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

productManager.addProduct(newProduct);

// Verificar que el objeto se haya agregado satisfactoriamente
const updatedProducts = productManager.getProducts();
console.log(updatedProducts);

// Llamar al método getProductById con un id existente
const foundProduct = productManager.getProductById(1);
console.log(foundProduct);

// Llamar al método getProductById con un id que no existe
const notFoundProduct = productManager.getProductById(10);
console.log(notFoundProduct);

// Actualizar producto y verificar que se mantiene le id
const updatedProduct = {
  title: "producto actualizado",
  description: "Este es un producto actualizado",
  price: 300,
  thumbnail: "Imagen actualizada",
  code: "abc123",
  stock: 30,
};

productManager.updateProduct(1, updatedProduct);
console.log(productManager.getProducts());

// Agregar otro producto para verificar la eliminación
const otherProduct = {
  title: "producto prueba 2",
  description: "Este es un otro producto prueba",
  price: 150,
  thumbnail: "Sin imagen tampoco",
  code: "abc456",
  stock: 100,
};

productManager.addProduct(otherProduct);

// Eliminar producto con id existente y verificar que realmente se haya eliminado
productManager.deleteProduct(1);
console.log(productManager.getProducts());

// Eliminar producto con id que no existe
productManager.deleteProduct(10);
console.log(productManager.getProducts());
