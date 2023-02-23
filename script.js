class Produkty {
    constructor(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.images = images;
    }

    getCardHTML() {
        return `
        <div class="card m-2 bg-secondary card-text-light " style="width: 15rem;">
            <img src="${this.images[1]}" height="180px" class="card-img-top" alt="...">
        <div class="card-body   ">
            <h4 class="card-title">${this.title}</h4>
            <p class="card-text">${this.description}</p>
             <h6 class="list-group-item">Rating: ${this.rating}</h6>
            <p class="list-group-item">Stock: ${this.stock} items</p>
                <h5 class="list-group-item">Price: ${this.price} $</h5>
   </div>
        <div class="card-body text-center">
     
 

<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
More
</button>



<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Gratuluji!!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Vyhrál jste nový elektornické zaøízení
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zavøít</button>
        <button type="button" class="btn btn-primary">vyít si výhru</button>
      </div>
    </div>
  </div>
</div>



        </div>
        </div>
        `;
    }

    getTableRowHTML() {
        return `
        <tr>
            <th>${this.title}</th>
            <th>${this.description}</th>
   <th>${this.category}</th>
<th>${this.brand}</th>
   <th>${this.rating}</th>
 <th>${this.stock}</th>
          <th>${this.discountPercentage}</th>
            <th>${this.price}</th>
  
           
       
            
         
        </tr>
        `;
    }
}

class Catalog {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        if (localStorage.getItem("products") == null) {
            // if the products item is not in the local storage, then load the products list from the web
            this.getProductsFromWeb();
            console.log("load from web");

        } else if (localStorage.getItem("products") != null) {
            // if the products item is in the local storage, then load the products list from the local storage
            this.getProductsFromLocalStorage();
            console.log("load from local storage");

        } else {
            // if there is an error, clear the local storage and show an error message
            this.clearLocalStorage();
            console.error("Error loading products");
        }
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductsFromWeb() {
        let req = new XMLHttpRequest();
        req.open("GET", "https://dummyjson.com/products");
        req.send();

        req.onprogress = (event) => {
            let percent = (event.loaded / event.total) * 100;
            this.updateProgressBar(true, percent);
        }

        req.onload = (e) => {
            let data = JSON.parse(req.responseText);

            if (data == null || data == undefined || data == "") {
                console.error("Error while parsing products from web");
                return;
            }

            data["products"].forEach(product => {
                this.addProduct(new Produkty(
                    product.id,
                    product.title,
                    product.description,
                    product.price,
                    product.discountPercentage,
                    product.rating,
                    product.stock,
                    product.brand,
                    product.category,
                    product.thumbnail,
                    product.images
                ));
            });

            this.saveToLocalStorage();
            this.printProducts();
            this.updateProgressBar(false, 0);

        }

        req.onerror = (error) => {
            console.log(error);
        }
    }

    saveToLocalStorage() {
        localStorage.setItem("products", JSON.stringify(this.products));
    }
    clearLocalStorage() {
        localStorage.removeItem("products");
    }

    getProductsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem("products"));

        products.forEach(product => {
            this.addProduct(new Produkty(
                product.id,
                product.title,
                product.description,
                product.price,
                product.discountPercentage,
                product.rating,
                product.stock,
                product.brand,
                product.category,
                product.thumbnail,
                product.images
            ));
        });

        this.printProducts();
    }

    updateProgressBar(isVisible, percent) {
        let parentDiv = document.getElementById("progress-bar");
        let progressBar = document.getElementById("progressBar");

        parentDiv.style.visibility = isVisible ? "visible" : "hidden";
        progressBar.style.width = percent + "%";
    }

    printProducts() {
        let html = "";
        let contentView = document.getElementById("content");
        const MODE = contentView.getAttribute("data-mode");

        if (MODE == null || MODE == "" || MODE == undefined) {
            console.error("Required attribute 'data-mode' not found");
            return;
        }

        switch (MODE) {
            case "cards":
                this.products.forEach(product => {
                    html += product.getCardHTML();
                });
                break;

            case "table":
                html += ` <tr><th>Title</th><th>Description</th><th>Category</th><th>Brand</th><th>Rating</th><th>Stock</th><th>Discount</th><th>Price</th></tr>`;
                this.products.forEach(product => {
                    html += product.getTableRowHTML();
                });
                break;

            default:
                console.error("Error printing products on page");
        }
        document.getElementById("content").innerHTML = html;
    }
}

onload = () => {
    let catalog = new Catalog();
}