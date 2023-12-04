function offTheLoader(){
    const loaderDiv =document.getElementById('loader-wrapper');
    loaderDiv.style.display = 'none';
}


function getURLParamasObject(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}


async function fetchCategoryList(){
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data;
}

async function fetchCartDetailById(id){
    const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return response.data;
}

async function fetchProductDetailById(id){
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
}

async function fetchCategoryById(id){
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
};


