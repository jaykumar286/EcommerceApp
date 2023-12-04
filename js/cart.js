document.addEventListener('DOMContentLoaded',async ()=>{
    
    function prepareWrapperDivForCartItems(product, productQuantity) {
        const orderDetailsProduct = document.createElement("div");
        orderDetailsProduct.classList.add("order-details-product", "d-flex", "flex-row");

        const orderDetailsProductImg = document.createElement("div");
        orderDetailsProductImg.classList.add("order-details-product-img", "d-flex");
        const image = document.createElement("img");
        image.src = product.image;
        orderDetailsProductImg.appendChild(image);

        const orderDetailsProductData = document.createElement("div");
        orderDetailsProductData.classList.add("order-details-product-data", "d-flex", "flex-column");
        const name = document.createElement("div");
        const price = document.createElement("div");
        name.textContent = product.title;
        price.textContent = product.price;
        orderDetailsProductData.appendChild(name);
        orderDetailsProductData.appendChild(price);


        const orderDetailsProductActions = document.createElement("div");
        orderDetailsProductActions.classList.add("order-details-product-actions", "d-flex", "flex-column");
        const orderDetailsProductQuantity = document.createElement("div");
        orderDetailsProductQuantity.classList.add("order-details-product-quantity");
        const quantityLabel = document.createElement("div");
        quantityLabel.textContent = "Quantity";
        quantityLabel.classList.add("fw-bold");
        const formGroup = document.createElement("div");
        formGroup.classList.add("form-group");
        const select = document.createElement("select");
        select.classList.add("form-select");
        for(let i = 1; i <= 10; i++) {
            const option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            if(i == productQuantity) {
                option.selected = "true";
            }
            select.appendChild(option);
        }
        formGroup.appendChild(select);
        orderDetailsProductQuantity.appendChild(quantityLabel);
        orderDetailsProductQuantity.appendChild(formGroup);
        orderDetailsProductActions.appendChild(orderDetailsProductQuantity);
        const remove = document.createElement("button");
        remove.classList.add("order-details-product-remove", "btn", "btn-danger");
        remove.textContent = "Remove";
        orderDetailsProductActions.appendChild(remove);
        


        orderDetailsProduct.appendChild(orderDetailsProductImg);
        orderDetailsProduct.appendChild(orderDetailsProductData);
        orderDetailsProduct.appendChild(orderDetailsProductActions);

        const hr = document.createElement("hr");
        document.getElementById("orderDetails").appendChild(orderDetailsProduct);
        document.getElementById("orderDetails").appendChild(hr);
    }

    async function populateCart(){
        const cartDetails = await fetchCartDetailById(1);
        const productQuantityMapper = {};
        const productInfo = cartDetails.products.map(product=>{
            productQuantityMapper[product.productId] = product.quantity;
            return fetchProductDetailById(product.productId);
        });
        const productDetails = await Promise.all(productInfo);

        let totalPrice = 0;
        productDetails.forEach(product=>{
            prepareWrapperDivForCartItems(product,productQuantityMapper[product.productId])
            totalPrice+=product.price;
        });

        document.getElementById('price').textContent = `${totalPrice}`;
        document.getElementById('net-price').textContent = `${totalPrice - 10}`;
    };

    populateCart();

});