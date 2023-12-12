class ProductManager {
    constructor() {
      this.products = []; 
      this.lastId = 0;    
    }
  
    create(title, description, price, photo, stock) {
      const id = this.lastId++; 
      const product = { id, title, description, price, photo, stock };
      this.products.push(product);
      return product;
    }
    read(){
        return this.products;
    }
    
  readOne(id){
    return this.products.find(product =>{
       return product.id === id;
    })
}
  }

  const productManager = new ProductManager();
  const product1 = productManager.create("Bomba de agua", "1 pulgada", 34000, "link", 10);
  const product2 = productManager.create("aro de luz led", "20 CM", 15000, "link", 15);


  const readProducts = productManager.read();
  const readOneProducts = productManager.readOne(Number(0))

  console.log(readOneProducts); 
  

class UserManager {
    constructor() {
      this.users = []; 
      this.lastid = 0;    
    }
  
    create(name, photo, email) {
      const id = this.lastid++; 
      const user = { id, name, photo, email };
      this.users.push(user);
      return user;
    }
    read(){
        return this.users;
    }
    
  readOne(id){
    return this.users.find(user =>{
       return user.id === id ;
    })
}
}

const users = new UserManager();

const user1 = users.create("PABLO GOMEZ", "foto no","pablo123@gmail.com" );
const user2 = users.create("JULIAN MENDOZA", "foto no","JULIAN321@GMAIL.COM" );
// console.log(user1);
// console.log(user2);

const userFind = users.readOne(0);

console.log(userFind)