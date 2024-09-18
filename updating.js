const fs = require('fs');
// Загрузка данных из JSON-файла
const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Функция для распределения связанных продуктов
function addRelatedProducts(products) {
    products.forEach(product => {
        const sameCategoryProducts = products
            .filter(p => p.id !== product.id && p.categories.some(cat => product.categories.includes(cat)))
            .map(p => p.id);
        shuffleArray(sameCategoryProducts);

        product.relatedProducts = sameCategoryProducts.slice(0, Math.min(sameCategoryProducts.length, Math.floor(Math.random() * 6) + 1));
    });
    return products;
}

// Обработка данных
const updatedProducts = addRelatedProducts(data);

// Сохраняем обновленные данные в новый JSON-файл
fs.writeFileSync('updated_data.json', JSON.stringify(updatedProducts, null, 2), 'utf-8');
