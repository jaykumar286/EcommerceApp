document.addEventListener('DOMContentLoaded',()=>{

    async function populateProductDetail(){
        const productDetailsDiv = document.getElementById('product-details');
        const params = getURLParamasObject();

        const productDetail = await fetchCategoryById(params.id);

        offTheLoader();

        const productImage = document.getElementById('product-img');

        const productNameDiv= document.createElement('div');
        const productPriceDiv= document.createElement('div');
        const productDescriptionDiv= document.createElement('div');
        const productDescriptionTitleDiv= document.createElement('div');
        const productDescriptionDataDiv= document.createElement('div');

        productNameDiv.classList.add("product-name");
        productPriceDiv.classList.add("product-price","fw-bold");
        productDescriptionDiv.classList.add("product-description");
        productDescriptionTitleDiv.classList.add("product-description-title");
        productDescriptionDataDiv.classList.add("product-description-data");

        productNameDiv.textContent = productDetail.category;
        productPriceDiv.textContent = `\u{020B9} ${productDetail.price}`;
        productDescriptionTitleDiv.textContent = productDetail.title;
        productDescriptionDataDiv.textContent = productDetail.description;
        productImage.src = productDetail.image;

        productDescriptionDiv.append(productDescriptionTitleDiv,productDescriptionDataDiv);
        productDetailsDiv.append(productNameDiv,productPriceDiv,productDescriptionDiv);
    };

    populateProductDetail();




});