async function fetchCategoryList(){
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data;
}

async function setCategeryList(){
    const categories = await fetchCategoryList();
    const categoryListDiv = document.getElementById('categoryList');

    categories.forEach((category)=>{
        const categoryItemDiv = document.createElement('div');
        const categoryItemAncher = document.createElement('a');
    
        categoryItemDiv.classList.add('category-item');
        categoryItemAncher.setAttribute('href',`productList.html?category=${category}`);

        categoryItemAncher.textContent = category;

        categoryItemDiv.appendChild(categoryItemAncher);
        categoryListDiv.appendChild(categoryItemDiv);
    });
}

setCategeryList()