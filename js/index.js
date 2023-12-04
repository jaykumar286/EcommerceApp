async function setCategeryList(){
    const categoryListDiv = document.getElementById('categoryList');

    const categories = await fetchCategoryList();
    offTheLoader();
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