document.addEventListener('DOMContentLoaded',()=>{

    async function getAllProductDetails(){
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
       return data;
    };

    async function getAllProductDetailsByCategory(category){
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        const data = response.data;
       return data;
    };

    async function fetchCategoryList(){
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        return data;
    }

    async function setCategeryList(){
        const categories = await fetchCategoryList();
        const categoryListDiv = document.getElementById('categoryList');
    
        categories.forEach((category)=>{
            const categoryItemAncher = document.createElement('a');
            categoryItemAncher.setAttribute('href',`productList.html?category=${category}`);
            categoryItemAncher.classList.add("d-flex","text-decoration-none");
            categoryItemAncher.textContent = category;
            categoryListDiv.appendChild(categoryItemAncher);
        });
    }
    
    setCategeryList()

    async function populateProductDetails(flag,customProductList){
        let productDetails = customProductList;

        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        if (!flag){

            if(params.category){
                productDetails = await getAllProductDetailsByCategory(params.category);
            }else{
                productDetails = await getAllProductDetails();   
            }
        }
        
        const productListDiv = document.getElementById("productList");

        productDetails.forEach((product)=>{

            const productAnchor = document.createElement('a');
            const productImgDiv = document.createElement('div');
            const productImg = document.createElement('img');
            const productNameDiv = document.createElement('div');
            const productPriceDiv = document.createElement('div');

            productAnchor.target = "_blank";
            productImg.src = product.image;
            productImg.alt = "";
            productNameDiv.textContent = product.title.substring(0,12)+'...';
            productPriceDiv.textContent = `\u{020B9} ${product.price}`;

            productAnchor.classList.add("product-item","text-decoration-none","d-inline-block");
            productImgDiv.classList.add("product-img");
            productNameDiv.classList.add("product-name","text-center");
            productPriceDiv.classList.add("product-price","text-center");

            productImgDiv.appendChild(productImg);
            productAnchor.append(productImgDiv,productNameDiv,productPriceDiv);
            productListDiv.appendChild(productAnchor);
        });
    };

    populateProductDetails(false);

    const searchBtn = document.getElementById('search');
    searchBtn.addEventListener('click',async ()=>{
        const minPrice = Number(document.getElementById('minPrice').value);
        const maxPrice = Number(document.getElementById('maxPrice').value);
        const productDetails = await getAllProductDetails();
        const productListDiv = document.getElementById("productList");
        productListDiv.innerHTML = '';

        const filterProducts = productDetails.filter(product=> minPrice<=product.price && maxPrice>=product.price);
        populateProductDetails(true,filterProducts);
    });

    const clearBtn =  document.getElementById('clear');
    clearBtn.addEventListener('click',()=>window.location.reload());
});