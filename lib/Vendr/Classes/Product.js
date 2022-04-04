
class Product {

    constructor(ProductId){
        this.ProductId = ProductId;
    }

    setDevProduct(DevProduct){
        this.DevProduct = DevProduct;
        return this;
    }

    setName(Name){
        this.Name = Name;
        return this;
    }

    setSale(Sale){
        this.Sale = Sale;
        return this;
    }

    setStock(Stock){
        this.Stock = Stock;
        return this;
    }

    setTestGame(TestGame){
        this.TestGame = TestGame;
        return this;
    }
}

module.exports = Product;