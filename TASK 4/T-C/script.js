document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Smartphone', category: 'electronics', price: 24999, rating: 4.5 },
        { id: 2, name: 'T-Shirt', category: 'fashion', price: 799, rating: 4.0 },
        { id: 3, name: 'Microwave', category: 'home', price: 10999, rating: 4.3 },
        { id: 4, name: 'Headphones', category: 'electronics', price: 4999, rating: 4.7 },
        { id: 5, name: 'Sneakers', category: 'fashion', price: 2299, rating: 4.2 },
    ];

    const productContainer = document.getElementById('productContainer');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortOptions = document.getElementById('sortOptions');

    function displayProducts(filteredProducts) {
        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <h2>${product.name}</h2>
                <p class="price">₹${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function filterAndSortProducts() {
        let filteredProducts = [...products];

        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        const selectedPrice = priceFilter.value;
        if (selectedPrice !== 'all') {
            const [min, max] = selectedPrice.split('-');
            filteredProducts = filteredProducts.filter(product => {
                if (max) {
                    return product.price >= min && product.price <= max;
                }
                return product.price >= min;
            });
        }

        const sortOption = sortOptions.value;
        if (sortOption === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'price-low-to-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high-to-low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(filteredProducts);
    }

    categoryFilter.addEventListener('change', filterAndSortProducts);
    priceFilter.addEventListener('change', filterAndSortProducts);
    sortOptions.addEventListener('change', filterAndSortProducts);

    displayProducts(products);
});
