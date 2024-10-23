const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


// Функция для получения цены с указанной ссылки
async function fetchPrices(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const price = $('.product-buy__price');
        const priceBenefitExists = $('.product-buy__price-benefit');
        const priceMarkExists = $('.product-buy__mark');

        let priceText;
        if (price.length > 1) {
            // Если два элемента, возьмем второй
            priceText = price.eq(1).text().trim();
        } else if (price.length === 1) {
            // Если один элемент, возьмем его
            priceText = price.eq(0).text().trim();
        } else {
            // Если элементов нет
            priceText = 0;
        }

        let priceBen
        if (priceBenefitExists.length > 1) {
            // Если два элемента, возьмем второй
            priceBen = priceBenefitExists.eq(1).text().trim();
        } else if (priceBenefitExists.length === 1) {
            // Если один элемент, возьмем его
            priceBen = priceBenefitExists.eq(0).text().trim();
        } else {
            // Если элементов нет
            priceBen = 0;
        }

        let priceMark
        if (priceMarkExists.length > 1) {
            // Если два элемента, возьмем второй
            priceMark = priceMarkExists.eq(1).text().trim();
        } else if (priceMarkExists.length === 1) {
            // Если один элемент, возьмем его
            priceMark = priceMarkExists.eq(0).text().trim();
        } else {
            // Если элементов нет
            priceMark = 0;
        }
        let priceInt;
        if (priceText !== 0) {
            priceInt = parseInt(priceText.replace(/\s+/g, ''), 10);
        }

        if (priceBen !== 0) {
            priceBen = parseInt(priceBen.replace(/\s+/g, ''), 10);
        }

        if (priceMark !== 0) {
            priceMark = parseInt(priceMark.replace(/\s+/g, ''), 10);
        }

        return {
            priceInt,
            priceBen,
            priceMark
        }
    } catch (error) {
        console.error(`Ошибка при получении цены с ${url}:`, error.message);
        return null;
    }
}
let products = [
        {
            "id": 1,
            "name": "Хит золото, корона красная",
            "slug": "stul-khit-25mm-zoloto-korona-krasnaya",
            "category": "profile25",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-zoloto-korona-krasnaya"
            },
            "wholesalePrice": 2050,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-1-1",
                "product-1-2",
                "product-1-3",
                "product-1-4",
                "product-1-5",
                "product-1-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-zoloto-korona-krasnaya"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-krasnaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 3484
        },
        {
            "id": 2,
            "name": "Хит алюминие&shy;вый каркас 25мм",
            "slug": "hit-aluminievui-karkas",
            "category": "profile25",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-siniy-zhakkard-alyuminiyevyy-karkas"
            },
            "wholesalePrice": 4290,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-2-1",
                "product-2-2"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "hit-aluminievui-karkas"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-alyuminiyevyy-karkas"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 52
        },
        {
            "id": 3,
            "name": "Хит хром, кожзам фиолетовый",
            "slug": "hit-khrom-kozhzam-fioletovyy",
            "category": "profile25",
            "color": "Фиолетовый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-khrom-kozhzam-fioletovyy"
            },
            "wholesalePrice": 2200,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-3-1",
                "product-3-2"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "hit-khrom-kozhzam-fioletovyy"
                }
            ],
            "relatedColor": [
                3,
                4,
                9,
                39,
                41,
                81
            ],
            "vendorId": 82
        },
        {
            "id": 4,
            "name": "Хит кожзам 25мм",
            "slug": "hit-khit-25mm-kozhzam",
            "category": "profile25",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-krasnyy-kozhzam"
            },
            "wholesalePrice": 2100,
            "retailPrice": 3190,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "кожзам",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-4-1",
                "product-4-2",
                "product-4-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "hit-khit-25mm-kozhzam"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-kozhzam"
                }
            ],
            "relatedColor": [
                3,
                4,
                9,
                39,
                41,
                81
            ],
            "vendorId": 270
        },
        {
            "id": 5,
            "name": "Хит золото, зеленая корона",
            "slug": "khit-25mm-zoloto-zelenaya-korona",
            "category": "profile25",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-zoloto-zelenaya-korona"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-5-1",
                "product-5-2",
                "product-5-3",
                "product-5-4",
                "product-5-5",
                "product-5-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-zelenaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-korona-zelenaya"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 350
        },
        {
            "id": 6,
            "name": "Хит золото, синяя корона",
            "slug": "khit-25mm-zoloto-sinyaya-korona",
            "category": "profile25",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-zoloto-sinyaya-korona"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-6-1",
                "product-6-2",
                "product-6-3",
                "product-6-4",
                "product-6-5",
                "product-6-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-sinyaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-korona-sinyaya"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 351
        },
        {
            "id": 7,
            "name": "Хит золото, коричневая корона 25мм",
            "slug": "khit-25mm-zoloto-korichnevaya-korona",
            "category": "profile25",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-zoloto-korichnevaya-korona"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-7-1",
                "product-7-2",
                "product-7-3",
                "product-7-4",
                "product-7-5",
                "product-7-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-korichnevaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-korichnevaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 352
        },
        {
            "id": 8,
            "name": "Хит с широким сиденьем",
            "slug": "hit-s-shirokim-sideniem",
            "category": "profile25",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-krasnyy-s-shirokim-sidenyem-zoloto-krasnaya-korona"
            },
            "wholesalePrice": 2950,
            "retailPrice": 4490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "470",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "7,7",
                    "unit": "кг"
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-8-1",
                "product-8-2",
                "product-8-3",
                "product-8-4",
                "product-8-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "hit-s-shirokim-sideniem"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 666
        },
        {
            "id": 9,
            "name": "Хит белый, кожзам белый",
            "slug": "khit-25mm-belyy-kozhzam-belyy",
            "category": "profile25",
            "color": "Белый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-belyy-kozhzam-belyy"
            },
            "wholesalePrice": 2100,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "кожзам",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-9-1",
                "product-9-2",
                "product-9-3",
                "product-9-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-belyy-kozhzam-belyy"
                }
            ],
            "relatedColor": [
                3,
                4,
                9,
                39,
                41,
                81
            ],
            "vendorId": 581
        },
        {
            "id": 10,
            "name": "Хит золото, бежевый ромб 25мм",
            "slug": "khit-25mm-zoloto-bezhevyy-romb",
            "category": "profile25",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-zoloto-bezhevyy-romb"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-10-1",
                "product-10-2",
                "product-10-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-bezhevyy-romb"
                }
            ],
            "relatedColor": [
                10,
                11,
                19,
                28,
                43,
                79
            ],
            "vendorId": 582
        },
        {
            "id": 11,
            "name": "Хит золото, зеленый ромб",
            "slug": "khit-25mm-zoloto-zelenyy-romb",
            "category": "profile25",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-zoloto-zelenyy-romb"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                }
            ],
            "images": [
                "product-11-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-zelenyy-romb"
                }
            ],
            "relatedColor": [
                10,
                11,
                19,
                28,
                43,
                79
            ],
            "vendorId": 583
        },
        {
            "id": 12,
            "name": "Хит красное дерево, шенилл бежевый",
            "slug": "khit-25mm-krasnoye-derevo-shenill-bezhevyy",
            "category": "profile25",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-krasnoye-derevo-shenill-bezhevyy"
            },
            "wholesalePrice": 1900,
            "retailPrice": 2890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "шенилл",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-12-1",
                "product-12-2",
                "product-12-3",
                "product-12-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-krasnoye-derevo-shenill-bezhevyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 585
        },
        {
            "id": 13,
            "name": "Хит золото, тёмно-коричневый арш",
            "slug": "khit-25mm-shampan-arsh-bezhevyy",
            "category": "profile25",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-shampan-arsh-bezhevyy"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                }
            ],
            "images": [
                "product-13-1",
                "product-13-2",
                "product-13-3",
                "product-13-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-shampan-arsh-bezhevyy"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-arsh-temno-korichnevyj"
                }
            ],
            "relatedColor": [
                13,
                18,
                20,
                45,
                54,
                82
            ],
            "vendorId": 592
        },
        {
            "id": 14,
            "name": "Хит коричневый, крон зеленый",
            "slug": "khit-25mm-korichnevyy-kron-zelenyy",
            "category": "profile25",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-korichnevyy-kron-zelenyy"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-14-1",
                "product-14-2",
                "product-14-3",
                "product-14-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-korichnevyy-kron-zelenyy"
                }
            ],
            "relatedColor": [
                14
            ],
            "vendorId": 598
        },
        {
            "id": 15,
            "name": "Хит золото, рогожка красная",
            "slug": "khit-25mm-zoloto-rogozhka-krasnaya",
            "category": "profile25",
            "color": "Красная",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-zoloto-rogozhka-krasnaya"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-15-1",
                "product-15-2",
                "product-15-3",
                "product-15-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-rogozhka-krasnaya"
                }
            ],
            "relatedColor": [
                15,
                25,
                37,
                47,
                49,
                50
            ],
            "vendorId": 613
        },
        {
            "id": 16,
            "name": "Хит алюминие&shy;вый каркас, золото, зеленая корона",
            "slug": "khit-25mm-alyuminiyevyy-karkas-zoloto-zelenaya-korona",
            "category": "profile25",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-alyuminiyevyy-karkas-zoloto-zelenaya-korona"
            },
            "wholesalePrice": 3940,
            "retailPrice": 5990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-16-1",
                "product-16-2",
                "product-16-3",
                "product-16-4",
                "product-16-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-alyuminiyevyy-karkas-zoloto-zelenaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 763
        },
        {
            "id": 18,
            "name": "Хит салатовый арш",
            "slug": "khit-25mm-salatovyy-arsh",
            "category": "profile25",
            "color": "Салатовый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-salatovyy-zoloto-arsh"
            },
            "wholesalePrice": 1800,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-18-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-salatovyy-arsh"
                }
            ],
            "relatedColor": [
                13,
                18,
                20,
                45,
                54,
                82
            ],
            "vendorId": 941
        },
        {
            "id": 19,
            "name": "Хит черный, синий ромб, с наружними заглушками",
            "slug": "khit-25mm-chernyy-siniy-romb-s-naruzhnimi-zaglushkami",
            "category": "profile25",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-chernyy-siniy-romb-s-naruzhnimi-zaglushkami"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-19-1",
                "product-19-2",
                "product-19-3",
                "product-19-4",
                "product-19-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-chernyy-siniy-romb-s-naruzhnimi-zaglushkami"
                }
            ],
            "relatedColor": [
                10,
                11,
                19,
                28,
                43,
                79
            ],
            "vendorId": 1014
        },
        {
            "id": 20,
            "name": "Хит шампань, бежевый арш, с наружними заглушками",
            "slug": "khit-25mm-bronza-bezhevyy-arsh-s-naruzhnimi-zaglushkami",
            "category": "profile25",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-bronza-bezhevyy-arsh-s-naruzhnimi-zaglushkami"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-20-1",
                "product-20-2",
                "product-20-3",
                "product-20-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-bronza-bezhevyy-arsh-s-naruzhnimi-zaglushkami"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-shampan-arsh-bezhevyy"
                }
            ],
            "relatedColor": [
                13,
                18,
                20,
                45,
                54,
                82
            ],
            "vendorId": 1015
        },
        {
            "id": 21,
            "name": "Хит шенилл светло-зеленый",
            "slug": "khit-25mm-shenill-svetlo-zelenyy",
            "category": "profile25",
            "color": "Светло-зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-zoloto-shenill-svetlo-zelenyy"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "шенилл",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-21-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-shenill-svetlo-zelenyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 1021
        },
        {
            "id": 22,
            "name": "Хит с вышивкой герб РФ",
            "slug": "khit-25mm-s-vyshivkoy-gerb-rf",
            "category": "profile25",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-s-vyshivkoy-gerb-rf-mikrovelvet"
            },
            "wholesalePrice": 4300,
            "retailPrice": 6490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "микровельвет",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-22-1",
                "product-22-2",
                "product-22-3",
                "product-22-4",
                "product-22-5",
                "product-22-6",
                "product-22-7"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-vyshivkoy-gerb-rf"
                }
            ],
            "relatedColor": [
                2
            ],
            "vendorId": 1210
        },
        {
            "id": 23,
            "name": "Хит золото, шенилл бордовый",
            "slug": "khit-25mm-shenill-bordovyy",
            "category": "profile25",
            "color": "Бордовый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm---shenill-bordovyy"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "Шенилл",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-23-1",
                "product-23-2",
                "product-23-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-shenill-bordovyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 1739
        },
        {
            "id": 24,
            "name": "Хит золото, шенилл темно-бежевый",
            "slug": "khit-25mm-shenill-temno-bezhevyy",
            "category": "profile25",
            "color": "Темно-бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-shenill-temno-bezhevyy"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "шенилл",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-24-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-shenill-temno-bezhevyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 1740
        },
        {
            "id": 25,
            "name": "Хит рогожка бежевая",
            "slug": "khit-25mm-rogozhka-bezhevaya",
            "category": "profile25",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-zoloto-rogozhka-bezhevaya"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-25-1",
                "product-25-2",
                "product-25-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-rogozhka-bezhevaya"
                }
            ],
            "relatedColor": [
                15,
                25,
                37,
                47,
                49,
                50
            ],
            "vendorId": 1742
        },
        {
            "id": 26,
            "name": "Хит серебро, синяя корона",
            "slug": "stul-khit-25mm-serebro-sinyaya-korona",
            "category": "profile25",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm---serebro-sinyaya-korona"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-26-1",
                "product-26-2",
                "product-26-3",
                "product-26-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-serebro-sinyaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 2773
        },
        {
            "id": 27,
            "name": "Хит золото, бежевая корона 25мм",
            "slug": "stul-khit-25mm-zoloto-bezhevaya-korona",
            "category": "profile25",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-zoloto-bezhevaya-korona"
            },
            "wholesalePrice": 2050,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-27-1",
                "product-27-2",
                "product-27-3",
                "product-27-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-zoloto-bezhevaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-bezhevaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 2825
        },
        {
            "id": 28,
            "name": "Хит бронза, ромб коричневый",
            "slug": "stul-khit-25mm-bronza-romb-korichnevyy",
            "category": "profile25",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-bronza-romb-korichnevyy"
            },
            "wholesalePrice": 1800,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-28-1",
                "product-28-2",
                "product-28-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-bronza-romb-korichnevyy"
                }
            ],
            "relatedColor": [
                10,
                11,
                19,
                28,
                43,
                79
            ],
            "vendorId": 3406
        },
        {
            "id": 29,
            "name": "Хит серебро, микрофибра синяя",
            "slug": "stul-khit-25mm-serebro-mikrofibra-sinyaya",
            "category": "profile25",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm---serebro-mikrofibra-sinyaya"
            },
            "wholesalePrice": 1900,
            "retailPrice": 2890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-29-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-serebro-mikrofibra-sinyaya"
                }
            ],
            "relatedColor": [
                29,
                78
            ],
            "vendorId": 3721
        },
        {
            "id": 30,
            "name": "Хит золото, кросс бежевый",
            "slug": "stul-khit-25mm-zoloto-kross-bezhevyy",
            "category": "profile25",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm---zoloto-kross-bezhevyy"
            },
            "wholesalePrice": 1850,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-30-1",
                "product-30-2",
                "product-30-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-zoloto-kross-bezhevyy"
                }
            ],
            "relatedColor": [
                34
            ],
            "vendorId": 3722
        },
        {
            "id": 34,
            "name": "Хит бронза, шенилл коричневый 25мм",
            "slug": "stul-khit-25mm-bronza-shenill-korichnevyy",
            "category": "profile25",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-bronza-shenill-korichnevyy"
            },
            "wholesalePrice": 1900,
            "retailPrice": 2890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-34-1",
                "product-34-2",
                "product-34-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-bronza-shenill-korichnevyy"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-bronza-shenill-korichnevyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 7667
        },
        {
            "id": 35,
            "name": "Хит с полкой для бумаг",
            "slug": "stul-khit-25mm-s-polkoy-dlya-bumag",
            "category": "profile25",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-s-polkoy-dlya-bumag-korichnevyy-zhakkard-korichnevyy"
            },
            "wholesalePrice": 2600,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-35-1",
                "product-35-2",
                "product-35-3",
                "product-35-4",
                "product-35-5",
                "product-35-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-s-polkoy-dlya-bumag"
                }
            ],
            "relatedColor": [
                35
            ],
            "vendorId": 11476
        },
        {
            "id": 36,
            "name": "Хит серебро, велюр серый",
            "slug": "stul-khit-25mm-serebro-velyur-seryy",
            "category": "profile25",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-serebro-velyur-seryy"
            },
            "wholesalePrice": 2050,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Материал сиденья",
                    "value": "велюр",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-36-1",
                "product-36-2",
                "product-36-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-serebro-velyur-seryy"
                }
            ],
            "relatedColor": [
                36,
                46,
                52,
                80,
                84
            ],
            "vendorId": 13134
        },
        {
            "id": 37,
            "name": "Хит серебро, рогожка темно-серая Tempo 9",
            "slug": "stul-khit-25mm-serebro-rogozhka-temno-seraya-tempo-9-2",
            "category": "profile25",
            "color": "Темно-серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-serebro-rogozhka-temno-seraya-tempo-9-2"
            },
            "wholesalePrice": 1800,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-37-1",
                "product-37-2",
                "product-37-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-serebro-rogozhka-temno-seraya-tempo-9-2"
                }
            ],
            "relatedColor": [
                15,
                25,
                37,
                47,
                49,
                50
            ],
            "vendorId": 13369
        },
        {
            "id": 38,
            "name": "Хит алюминий, золото корона красная",
            "slug": "stul-khit-25mm-alyuminiy-zoloto-korona-krasnaya",
            "category": "profile25",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-alyuminiy-zoloto-korona-krasnaya"
            },
            "wholesalePrice": 4290,
            "retailPrice": 6490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-38-1",
                "product-38-2",
                "product-38-3",
                "product-38-4",
                "product-38-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-alyuminiy-zoloto-korona-krasnaya"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-alyuminiyevyy-karkas-zoloto-krasnaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 8753
        },
        {
            "id": 39,
            "name": "Хит кожзам 20мм",
            "slug": "khit-20mm-kozhzam",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-krasnyy-kozhzam-chernyy-muar"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2500,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "кожзам",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-39-1",
                "product-39-2",
                "product-39-3",
                "product-39-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "hit-khit-25mm-kozhzam"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-kozhzam"
                }
            ],
            "relatedColor": [
                3,
                4,
                9,
                39,
                41,
                81
            ],
            "vendorId": 40
        },
        {
            "id": 40,
            "name": "Хит алюминие&shy;вый каркас 20мм",
            "slug": "khit-20mm-alyuminiyevyy-karkas",
            "category": "profile20",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-serebro-siniy-zhakkard"
            },
            "wholesalePrice": 3450,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "4,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-40-1",
                "product-40-2",
                "product-40-3",
                "product-40-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "hit-aluminievui-karkas"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-alyuminiyevyy-karkas"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 53
        },
        {
            "id": 41,
            "name": "Хит хром, кожзам",
            "slug": "khit-20mm-khrom-kozhzam",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-khrom-kozhzam"
            },
            "wholesalePrice": 2050,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "580",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "460",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "кожзам",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-41-1",
                "product-41-2"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-khrom-kozhzam"
                }
            ],
            "relatedColor": [
                3,
                4,
                9,
                39,
                41,
                81
            ],
            "vendorId": 344
        },
        {
            "id": 42,
            "name": "Хит золото, красная корона",
            "slug": "khit-20mm-zoloto-krasnaya-korona",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/banketnyy-stul-khit-20mm-zoloto-korona-krasnaya"
            },
            "wholesalePrice": 2140,
            "retailPrice": 3290,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-42-1",
                "product-42-2",
                "product-42-3",
                "product-42-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-zoloto-korona-krasnaya"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-krasnaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 54556
        },
        {
            "id": 43,
            "name": "Хит золото, ромб 20мм",
            "slug": "khit-20mm-zoloto-bezhevyy-romb",
            "category": "profile20",
            "color": "Желтый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-romb"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-43-1",
                "product-43-2",
                "product-43-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-bezhevyy-romb"
                }
            ],
            "relatedColor": [
                10,
                11,
                19,
                28,
                43,
                79
            ],
            "vendorId": 347
        },
        {
            "id": 44,
            "name": "Хит антик серебро, корона синяя",
            "slug": "khit-20mm-antik-serebro-korona-sinyaya",
            "category": "profile20",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-antik-serebro-korona-sinyaya"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-44-1",
                "product-44-2",
                "product-44-3",
                "product-44-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-antik-serebro-korona-sinyaya"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 374
        },
        {
            "id": 45,
            "name": "Хит антик медь, арш темно-коричневый",
            "slug": "khit-20mm-antik-med-arsh-temno-korichnevyy",
            "category": "profile20",
            "color": "Темно-коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-antik-med-arsh-temno-korichnevyy"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-45-1",
                "product-45-2",
                "product-45-3",
                "product-45-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-antik-med-arsh-temno-korichnevyy"
                }
            ],
            "relatedColor": [
                13,
                18,
                20,
                45,
                54,
                82
            ],
            "vendorId": 375
        },
        {
            "id": 46,
            "name": "Хит антик серебро, велюр серый",
            "slug": "khit-20mm-antik-serebro-velyur-seryy",
            "category": "profile20",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-antik-serebro-velyur-seryy"
            },
            "wholesalePrice": 1950,
            "retailPrice": 2990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "велюр",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-46-1",
                "product-46-2",
                "product-46-3",
                "product-46-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-antik-serebro-velyur-seryy"
                }
            ],
            "relatedColor": [
                36,
                46,
                52,
                80,
                84
            ],
            "vendorId": 376
        },
        {
            "id": 47,
            "name": "Хит антик золото на белом, рогожка бежевая",
            "slug": "khit-20mm-antik-zoloto-na-belom-rogozhka-bezhevaya",
            "category": "profile20",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-antik-zoloto-na-belom-rogozhka-bezhevaya"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-47-1",
                "product-47-2",
                "product-47-3",
                "product-47-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-antik-zoloto-na-belom-rogozhka-bezhevaya"
                }
            ],
            "relatedColor": [
                15,
                25,
                37,
                47,
                49,
                50
            ],
            "vendorId": 377
        },
        {
            "id": 48,
            "name": "Хит золото, корона зеленая",
            "slug": "khit-20mm-zoloto-korona-zelenaya",
            "category": "profile20",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-zoloto-korona-zelenaya"
            },
            "wholesalePrice": 2100,
            "retailPrice": 3190,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-48-1",
                "product-48-2",
                "product-48-3",
                "product-48-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-zelenaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-korona-zelenaya"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 492
        },
        {
            "id": 49,
            "name": "Хит лайт - серебро, рогожка серая",
            "slug": "khit-20mm-layt-serebro-rogozhka-seraya",
            "category": "profile20",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-layt-serebro-rogozhka-seraya"
            },
            "wholesalePrice": 1650,
            "retailPrice": 2490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-49-1",
                "product-49-2",
                "product-49-3",
                "product-49-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-layt-serebro-rogozhka-seraya"
                }
            ],
            "relatedColor": [
                15,
                25,
                37,
                47,
                49,
                50
            ],
            "vendorId": 515
        },
        {
            "id": 50,
            "name": "Хит золото, рогожка фиолетовая",
            "slug": "khit-20mm-zoloto-rogozhka-fioletovaya",
            "category": "profile20",
            "color": "Фиолетовый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-fioletovyy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-50-1",
                "product-50-2",
                "product-50-3",
                "product-50-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-rogozhka-fioletovaya"
                }
            ],
            "relatedColor": [
                15,
                25,
                37,
                47,
                49,
                50
            ],
            "vendorId": 518
        },
        {
            "id": 51,
            "name": "Хит серебро, шенилл красный",
            "slug": "khit-20mm-serebro-shenill-krasnyy",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-serebro-shenill-krasnyy"
            },
            "wholesalePrice": 1750,
            "retailPrice": 2690,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "шенилл",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-51-1",
                "product-51-2",
                "product-51-3",
                "product-51-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-serebro-shenill-krasnyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 587
        },
        {
            "id": 52,
            "name": "Хит светлое золото, велюр голубой",
            "slug": "khit-20mm-svetloye-zoloto-velyur-goluboy",
            "category": "profile20",
            "color": "Голубой",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-svetloye-zoloto-velyur-goluboy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "велюр",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-52-1",
                "product-52-2",
                "product-52-3",
                "product-52-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-svetloye-zoloto-velyur-goluboy"
                }
            ],
            "relatedColor": [
                36,
                46,
                52,
                80,
                84
            ],
            "vendorId": 599
        },
        {
            "id": 54,
            "name": "Хит золото, арш темно-коричневый",
            "slug": "khit-20mm-zoloto-arsh-temno-korichnevyj",
            "category": "profile20",
            "color": "Темно-коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-arsh-temno-korichnevyy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-54-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-shampan-arsh-bezhevyy"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-arsh-temno-korichnevyj"
                }
            ],
            "relatedColor": [
                13,
                18,
                20,
                45,
                54,
                82
            ],
            "vendorId": 7665
        },
        {
            "id": 56,
            "name": "Хит алюминие&shy;вый каркас, золото, красная корона",
            "slug": "khit-20mm-alyuminiyevyy-karkas-zoloto-krasnaya-korona",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-alyuminiyevyy-karkas-zoloto-krasnaya-korona"
            },
            "wholesalePrice": 3590,
            "retailPrice": 5390,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-56-1",
                "product-56-2",
                "product-56-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-alyuminiy-zoloto-korona-krasnaya"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-alyuminiyevyy-karkas-zoloto-krasnaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 762
        },
        {
            "id": 57,
            "name": "Хит золото, полоса узкая синяя",
            "slug": "khit-20mm-polosa-uzkaya-sinyaya",
            "category": "profile20",
            "color": "Синий, желтый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-polosa-uzkaya-sinyaya"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-57-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-polosa-uzkaya-sinyaya"
                }
            ],
            "relatedColor": [
                57
            ],
            "vendorId": 942
        },
        {
            "id": 60,
            "name": "Хит золото, Зигзаг серый",
            "slug": "khit-20mm-zoloto-zigzag-seryy",
            "category": "profile20",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-zoloto-zigzag-seryy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-60-1",
                "product-60-2",
                "product-60-3",
                "product-60-4",
                "product-60-5",
                "product-60-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-zigzag-seryy"
                }
            ],
            "relatedColor": [
                60
            ],
            "vendorId": 1666
        },
        {
            "id": 62,
            "name": "Хит золото, Старт серый",
            "slug": "khit-20mm-zoloto-start-seryy",
            "category": "profile20",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-zoloto-start-seryy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2100,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-62-1",
                "product-62-2",
                "product-62-3",
                "product-62-4",
                "product-62-5",
                "product-62-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-start-seryy"
                }
            ],
            "relatedColor": [
                62,
                63
            ],
            "vendorId": 1669
        },
        {
            "id": 63,
            "name": "Хит золото, Старт красный",
            "slug": "khit-20mm-zoloto-start-krasnyy",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-zoloto-start-krasnyy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-63-1",
                "product-63-2",
                "product-63-3",
                "product-63-4",
                "product-63-5",
                "product-63-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-start-krasnyy"
                }
            ],
            "relatedColor": [
                62,
                63
            ],
            "vendorId": 1670
        },
        {
            "id": 66,
            "name": "Хит золото, Сабо черный",
            "slug": "khit-20mm-zoloto-sabo-chernyy",
            "category": "profile20",
            "color": "Черный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-zoloto-sabo-chernyy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-66-1",
                "product-66-2",
                "product-66-3",
                "product-66-4",
                "product-66-5",
                "product-66-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-zoloto-sabo-chernyy"
                }
            ],
            "relatedColor": [
                66
            ],
            "vendorId": 1674
        },
        {
            "id": 69,
            "name": "Хит золото, бежевая корона 20мм",
            "slug": "stul-khit-20mm-zoloto-bezhevaya-korona",
            "category": "profile20",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm---zoloto-bezhevaya-korona"
            },
            "wholesalePrice": 1890,
            "retailPrice": 2890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-69-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-zoloto-bezhevaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-bezhevaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 2776
        },
        {
            "id": 70,
            "name": "Хит золото, шенилл красный",
            "slug": "stul-khit-20mm-zoloto-shenill-krasnyy",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm---zoloto-shenill-krasnyy"
            },
            "wholesalePrice": 1800,
            "retailPrice": 2790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "шенилл",
                    "unit": ""
                }
            ],
            "images": [
                "product-70-1",
                "product-70-2",
                "product-70-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-shenill-krasnyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 3505
        },
        {
            "id": 71,
            "name": "Хит золото, коричневая корона 20мм",
            "slug": "stul-khit-20mm-zoloto-korichnevaya-korona",
            "category": "profile20",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm---zoloto-korichnevaya-korona"
            },
            "wholesalePrice": 1890,
            "retailPrice": 2890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-71-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-korichnevaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-korichnevaya-korona"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 4125
        },
        {
            "id": 75,
            "name": "Хит бронза, шенилл коричневый 20мм",
            "slug": "stul-khit-20mm-bronza-shenill-korichnevyy",
            "category": "profile20",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-bronza-shenill-korichnevyy"
            },
            "wholesalePrice": 1750,
            "retailPrice": 2690,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-75-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-bronza-shenill-korichnevyy"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-bronza-shenill-korichnevyy"
                }
            ],
            "relatedColor": [
                12,
                21,
                23,
                24,
                34,
                51,
                70,
                75
            ],
            "vendorId": 7296
        },
        {
            "id": 78,
            "name": "Хит золото, микрофибра красная",
            "slug": "stul-khit-20mm-zoloto-mikrofibra-krasnaya",
            "category": "profile20",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-mikrofibra-krasnaya"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "микрофибра",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-78-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-mikrofibra-krasnaya"
                }
            ],
            "relatedColor": [
                29,
                78
            ],
            "vendorId": 8341
        },
        {
            "id": 79,
            "name": "Хит золото, ромб синий",
            "slug": "stul-khit-20mm-zoloto-romb-siniy",
            "category": "profile20",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-romb-siniy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-79-1",
                "product-79-2",
                "product-79-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-romb-siniy"
                }
            ],
            "relatedColor": [
                10,
                11,
                19,
                28,
                43,
                79
            ],
            "vendorId": 8343
        },
        {
            "id": 80,
            "name": "Хит шампань, велюр голубой",
            "slug": "stul-khit-20mm-shampan-velyur-goluboy",
            "category": "profile20",
            "color": "Голубой",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-shampan-velyur-goluboy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-80-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-shampan-velyur-goluboy"
                }
            ],
            "relatedColor": [
                36,
                46,
                52,
                80,
                84
            ],
            "vendorId": 8344
        },
        {
            "id": 81,
            "name": "Хит золото, кожзам темно-коричневый",
            "slug": "stul-khit-20mm-zoloto-kozhzam-temno-korichnevyy",
            "category": "profile20",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-kozhzam-temno-korichnevyy"
            },
            "wholesalePrice": 2000,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "кожзам",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-81-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-kozhzam-temno-korichnevyy"
                }
            ],
            "relatedColor": [
                3,
                4,
                9,
                39,
                41,
                81
            ],
            "vendorId": 8346
        },
        {
            "id": 82,
            "name": "Хит шампань, арш бежевый",
            "slug": "stul-khit-20mm-shampan-arsh-bezhevyy",
            "category": "profile20",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-shampan-arsh-bezhevyy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-82-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-bronza-bezhevyy-arsh-s-naruzhnimi-zaglushkami"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-shampan-arsh-bezhevyy"
                }
            ],
            "relatedColor": [
                13,
                18,
                20,
                45,
                54,
                82
            ],
            "vendorId": 13153
        },
        {
            "id": 83,
            "name": "Хит золото, корона синяя",
            "slug": "stul-khit-20mm-zoloto-korona-sinyaya",
            "category": "profile20",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-korona-sinyaya"
            },
            "wholesalePrice": 1890,
            "retailPrice": 2890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-83-1",
                "product-83-2",
                "product-83-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-zoloto-sinyaya-korona"
                },
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-korona-sinyaya"
                }
            ],
            "relatedColor": [
                1,
                5,
                6,
                7,
                2,
                16,
                26,
                8,
                27,
                38,
                42,
                44,
                48,
                40,
                56,
                69,
                71,
                83
            ],
            "vendorId": 13256
        },
        {
            "id": 84,
            "name": "Хит золото, велюр желтый",
            "slug": "stul-khit-20mm-zoloto-velyur-zheltyy",
            "category": "profile20",
            "color": "Желтый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-zoloto-velyur-zheltyy"
            },
            "wholesalePrice": 1700,
            "retailPrice": 2590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-84-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-zoloto-velyur-zheltyy"
                }
            ],
            "relatedColor": [
                36,
                46,
                52,
                80,
                84
            ],
            "vendorId": 13648
        },
        {
            "id": 85,
            "name": "Хит 20мм с пюпитром, алюминие&shy;вый каркас",
            "slug": "khit-20mm-s-pyupitrom-alyuminiyevyy-karkas",
            "category": "pupitr",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-s-pyupitrom-alyuminiyevyy-karkas"
            },
            "wholesalePrice": 4650,
            "retailPrice": 6990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "7",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-85-1",
                "product-85-2",
                "product-85-3",
                "product-85-4",
                "product-85-5",
                "product-85-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-s-pyupitrom-alyuminiyevyy-karkas"
                }
            ],
            "relatedColor": [
                85,
                86,
                87
            ],
            "vendorId": 54
        },
        {
            "id": 86,
            "name": "Хит 25мм с пюпитром, красный",
            "slug": "khit-25mm-s-pyupitrom-krasnyj",
            "category": "pupitr",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-krasnyy-s-pyupitrom"
            },
            "wholesalePrice": 2700,
            "retailPrice": 4090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "9,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-86-1",
                "product-86-2"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-pyupitrom-krasnyj"
                }
            ],
            "relatedColor": [
                85,
                86,
                87
            ],
            "vendorId": 83
        },
        {
            "id": 87,
            "name": "Хит 20мм с пюпитром, жаккард ",
            "slug": "khit-20mm-s-pyupitrom-zhakkard",
            "category": "pupitr",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-s-pyupitrom-zhakkard"
            },
            "wholesalePrice": 2250,
            "retailPrice": 3390,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-87-1",
                "product-87-2",
                "product-87-3",
                "product-87-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-s-pyupitrom-zhakkard"
                }
            ],
            "relatedColor": [
                85,
                86,
                87
            ],
            "vendorId": 235
        },
        {
            "id": 88,
            "name": "Хит 20мм с пюпитром, золото, шенилл красный",
            "slug": "stul-khit-20mm-s-pyupitrom",
            "category": "pupitr",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-s-pyupitrom"
            },
            "wholesalePrice": 2350,
            "retailPrice": 3590,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8,5",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-88-1",
                "product-88-2",
                "product-88-3",
                "product-88-4",
                "product-88-5",
                "product-88-6"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-s-pyupitrom"
                }
            ],
            "relatedColor": [
                88
            ],
            "vendorId": 572
        },
        {
            "id": 89,
            "name": "Хит 25мм с подлокот&shy;никами и пюпитром",
            "slug": "khit-25mm-s-podlokotnikamy-i-pyupitrom",
            "category": "pupitr",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-serebryanyy-s-podlokotnikami-i-pyupitrom"
            },
            "wholesalePrice": 4200,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-89-1",
                "product-89-2",
                "product-89-3",
                "product-89-4",
                "product-89-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-podlokotnikamy-i-pyupitrom"
                }
            ],
            "relatedColor": [
                89
            ],
            "vendorId": 1517
        },
        {
            "id": 91,
            "name": "Хит 25мм с подлокот&shy;никами шампань, Afitap",
            "slug": "stul-khit-25mm-s-podlokotnikami-shampan-afitap",
            "category": "podlokotniki",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-s-podlokotnikami-shampan-afitap"
            },
            "wholesalePrice": 2500,
            "retailPrice": 3790,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-91-1",
                "product-91-2",
                "product-91-3",
                "product-91-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-s-podlokotnikami-shampan-afitap"
                }
            ],
            "relatedColor": [
                91
            ],
            "vendorId": 606
        },
        {
            "id": 92,
            "name": "Хит 25мм с подлокот&shy;никами алюминие&shy;вый каркас",
            "slug": "khit-25mm-s-podlokotnikami-alyuminiyevyy-karkas",
            "category": "podlokotniki",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-s-podlokotnikami-alyuminiyevyy-karkas"
            },
            "wholesalePrice": 4800,
            "retailPrice": 6400,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-92-1",
                "product-92-2",
                "product-92-3",
                "product-92-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-podlokotnikami-alyuminiyevyy-karkas"
                }
            ],
            "relatedColor": [
                92,
                98,
                99
            ],
            "vendorId": 55
        },
        {
            "id": 94,
            "name": "Хит 25мм с подлокот&shy;никами и широким сиденьем",
            "slug": "khit-25mm-s-podlokotnikami-i-shirokim-sidenyem",
            "category": "podlokotniki",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-s-podlokotnikami-i-shirokim-sidenyem"
            },
            "wholesalePrice": 3490,
            "retailPrice": 5290,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-94-1",
                "product-94-2",
                "product-94-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-podlokotnikami-i-shirokim-sidenyem"
                }
            ],
            "relatedColor": [
                94
            ],
            "vendorId": 669
        },
        {
            "id": 95,
            "name": "Хит 25мм с подлокот&shy;никами, орех, шеннил Palmira",
            "slug": "khit-25mm-s-podlokotnikami-oreh-shennil-palmira",
            "category": "podlokotniki",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-s-podlokotnikami-oreh-shennil-palmira"
            },
            "wholesalePrice": 2990,
            "retailPrice": 4490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-95-1",
                "product-95-2",
                "product-95-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-podlokotnikami-oreh-shennil-palmira"
                }
            ],
            "relatedColor": [
                95
            ],
            "vendorId": 686
        },
        {
            "id": 96,
            "name": "Хит 25мм с подлокот&shy;никами с вышивкой герб РФ",
            "slug": "khit-25mm-s-podlokotnikami-s-vyshivkoy-gerb-rf",
            "category": "podlokotniki",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-25mm-s-podlokotnikami-s-vyshivkoy-gerb-rf"
            },
            "wholesalePrice": 4900,
            "retailPrice": 7390,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "микровельвет",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-96-1",
                "product-96-2",
                "product-96-3",
                "product-96-4",
                "product-96-5",
                "product-96-6",
                "product-96-7"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "khit-25mm-s-podlokotnikami-s-vyshivkoy-gerb-rf"
                }
            ],
            "relatedColor": [
                96
            ],
            "vendorId": 1211
        },
        {
            "id": 98,
            "name": "Хит 25мм, алюминие&shy;вый каркас, с закруглен&shy;ными подлокот&shy;никами, серебро, корона синяя",
            "slug": "stul-khit-25mm-alyuminiyevyy-karkas-s-zakruglennymi-podlokotnikami-serebro-korona-sinyaya",
            "category": "podlokotniki",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-alyuminiyevyy-karkas-s-zakruglennymi-podlokotnikami-serebro-korona-sinyaya"
            },
            "wholesalePrice": 4900,
            "retailPrice": 7390,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "6",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-98-1",
                "product-98-2",
                "product-98-3",
                "product-98-4",
                "product-98-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-alyuminiyevyy-karkas-s-zakruglennymi-podlokotnikami-serebro-korona-sinyaya"
                }
            ],
            "relatedColor": [
                92,
                98,
                99
            ],
            "vendorId": 8752
        },
        {
            "id": 99,
            "name": "Хит 25мм с закруглен&shy;ными подлокот&shy;никами, золото, корона красная",
            "slug": "stul-khit-25mm-s-zakruglennymi-podlokotnikami-zoloto-korona-krasnaya",
            "category": "podlokotniki",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-25mm-s-zakruglennymi-podlokotnikami-zoloto-korona-krasnaya"
            },
            "wholesalePrice": 2600,
            "retailPrice": 3990,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "420",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-99-1",
                "product-99-2",
                "product-99-3",
                "product-99-4",
                "product-99-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile25",
                    "value": "25 мм",
                    "slug": "stul-khit-25mm-s-zakruglennymi-podlokotnikami-zoloto-korona-krasnaya"
                }
            ],
            "relatedColor": [
                92,
                98,
                99
            ],
            "vendorId": 8754
        },
        {
            "id": 100,
            "name": "Хит 20мм с подлокот&shy;никами, Лайт",
            "slug": "khit-20mm-s-podlokotnikami-layt",
            "category": "podlokotniki",
            "color": "Серый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-s-podlokotnikami-layt"
            },
            "wholesalePrice": 2050,
            "retailPrice": 3090,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-100-1",
                "product-100-2",
                "product-100-3",
                "product-100-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-s-podlokotnikami-layt"
                }
            ],
            "relatedColor": [
                100,
                101
            ],
            "vendorId": 514
        },
        {
            "id": 101,
            "name": "Хит 20мм с подлокот&shy;никами, алюминие&shy;вый каркас",
            "slug": "khit-20mm-s-podlokotnikami-alyuminiyevyy-karkas",
            "category": "podlokotniki",
            "color": "Черный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-s-podlokotnikami-seryy"
            },
            "wholesalePrice": 4590,
            "retailPrice": 6890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "алюминий",
                    "unit": ""
                }
            ],
            "images": [
                "product-101-1",
                "product-101-2"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-s-podlokotnikami-alyuminiyevyy-karkas"
                }
            ],
            "relatedColor": [
                100,
                101
            ],
            "vendorId": 190
        },
        {
            "id": 102,
            "name": "Хит 20мм с каретной стяжкой, хром, рогожка фиолетовая",
            "slug": "khit-20mm-s-karetnoy-styazhkoy-khrom-rogozhka-fioletovaya",
            "category": "skaretnoystyazhkoi",
            "color": "Фиолетовый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/khit-20mm-s-karetnoy-styazhkoy-khrom-rogozhka-fioletovaya"
            },
            "wholesalePrice": 2650,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал сиденья",
                    "value": "ткань",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-102-1",
                "product-102-2",
                "product-102-3",
                "product-102-4",
                "product-102-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "khit-20mm-s-karetnoy-styazhkoy-khrom-rogozhka-fioletovaya"
                }
            ],
            "relatedColor": [
                102,
                103
            ],
            "vendorId": 1595
        },
        {
            "id": 103,
            "name": "Хит 20мм с каретной стяжкой, золото, кожзам голубой",
            "slug": "stul-khit-20mm-s-karetnoy-styazhkoy-zoloto-kozhzam-goluboy",
            "category": "skaretnoystyazhkoi",
            "color": "Голубой",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-s-karetnoy-styazhkoy-zoloto-kozhzam-goluboy"
            },
            "wholesalePrice": 2850,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "410",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "рогожка",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-103-1",
                "product-103-2",
                "product-103-3",
                "product-103-4",
                "product-103-5"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-s-karetnoy-styazhkoy-zoloto-kozhzam-goluboy"
                }
            ],
            "relatedColor": [
                102,
                103
            ],
            "vendorId": 3177
        },
        {
            "id": 104,
            "name": "Хит 20мм, складной, золото, серо-розовый кожзам",
            "slug": "stul-khit-20mm-skladnoy-zoloto-sero-rozovyy-kozhzam",
            "category": "skladnoy",
            "color": "Серо-розовый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-zoloto-sero-rozovyy-kozhzam"
            },
            "wholesalePrice": 3150,
            "retailPrice": 4490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "390",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "950",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-104-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-zoloto-sero-rozovyy-kozhzam"
                }
            ],
            "relatedColor": [
                104,
                105
            ],
            "vendorId": 13053
        },
        {
            "id": 105,
            "name": "Хит 20мм, серебро, бежевый кожзам",
            "slug": "stul-khit-20mm-skladnoy-serebro-bezhevyy-kozhzam",
            "category": "skladnoy",
            "color": "Бежевый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-serebro-bezhevyy-kozhzam"
            },
            "wholesalePrice": 3150,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "390",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "950",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-105-1",
                "product-105-2",
                "product-105-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-serebro-bezhevyy-kozhzam"
                }
            ],
            "relatedColor": [
                104,
                105
            ],
            "vendorId": 7158
        },
        {
            "id": 106,
            "name": "Хит 20мм золото, корона зеленая",
            "slug": "stul-khit-20mm-skladnoy-zoloto-korona-zelenaya",
            "category": "skladnoy",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-zoloto-korona-zelenaya"
            },
            "wholesalePrice": 3150,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "370",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "450",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-106-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-zoloto-korona-zelenaya"
                }
            ],
            "relatedColor": [
                106,
                108,
                109,
                110
            ],
            "vendorId": 3325
        },
        {
            "id": 107,
            "name": "Хит 20мм, серебро, черный",
            "slug": "stul-khit-20mm-skladnoy-serebro-chernyy",
            "category": "skladnoy",
            "color": "Черный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-serebro-chernyy"
            },
            "wholesalePrice": 3150,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "390",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "950",
                    "unit": "мм"
                },
                {
                    "name": "Высота посадочного места",
                    "value": "465",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-107-1",
                "product-107-2",
                "product-107-3"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-serebro-chernyy"
                }
            ],
            "relatedColor": [
                107
            ],
            "vendorId": 7157
        },
        {
            "id": 108,
            "name": "Хит 20мм серебро, корона зеленая",
            "slug": "stul-khit-20mm-skladnoy-serebro-korona-zelenaya",
            "category": "skladnoy",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-serebro-korona-zelenaya"
            },
            "wholesalePrice": 3150,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "390",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "450",
                    "unit": "мм"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-108-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-serebro-korona-zelenaya"
                }
            ],
            "relatedColor": [
                106,
                108,
                109,
                110
            ],
            "vendorId": 3324
        },
        {
            "id": 109,
            "name": "Хит 20мм золото, корона красная",
            "slug": "stul-khit-20mm-skladnoy-zoloto-korona-krasnaya",
            "category": "skladnoy",
            "color": "Красный",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-zoloto-korona-krasnaya"
            },
            "wholesalePrice": 3150,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "370",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Высота до сиденья",
                    "value": "370",
                    "unit": "мм"
                },
                {
                    "name": "Вес",
                    "value": "5,8",
                    "unit": "кг"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-109-1"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-zoloto-korona-krasnaya"
                }
            ],
            "relatedColor": [
                106,
                108,
                109,
                110
            ],
            "vendorId": 3323
        },
        {
            "id": 110,
            "name": "Хит 20мм серебро, корона синяя",
            "slug": "stul-khit-20mm-skladnoy-serebro-korona-sinyaya",
            "category": "skladnoy",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/stul-khit-20mm-skladnoy-serebro-korona-sinyaya"
            },
            "wholesalePrice": 3150,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "370",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "560",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Обивка",
                    "value": "жаккард",
                    "unit": ""
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-110-1",
                "product-110-2",
                "product-110-3",
                "product-110-4"
            ],
            "relatedCategory": [
                {
                    "name": "profile20",
                    "value": "20 мм",
                    "slug": "stul-khit-20mm-skladnoy-serebro-korona-sinyaya"
                }
            ],
            "relatedColor": [
                106,
                108,
                109,
                110
            ],
            "vendorId": 3179
        },
        {
            "id": 111,
            "name": "Хит серебро, ромб синий, 2 секции",
            "slug": "stul-khit-section-serebro-sinij",
            "category": "section",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-stulyev-khit-serebro-romb-siniy"
            },
            "wholesalePrice": 4590,
            "retailPrice": 6890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "910",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-111-1",
                "product-111-2",
                "product-111-3",
                "product-111-4"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                112,
                113,
                114
            ],
            "vendorId": 3454
        },
        {
            "id": 112,
            "name": "Хит коричневый, ромб коричневый, 2 секции",
            "slug": "stul-khit-section-romb-korichnevyj",
            "category": "section",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-stulyev-khit-korichnevyy-romb-korichnevyy"
            },
            "wholesalePrice": 4590,
            "retailPrice": 6890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "910",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-112-1",
                "product-112-2",
                "product-112-3",
                "product-112-4"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                111,
                113,
                114
            ],
            "vendorId": 3452
        },
        {
            "id": 113,
            "name": "Хит золото, ромб зеленый, 2 секции",
            "slug": "stul-khit-section-zoloto-zelenyj",
            "category": "section",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-stulyev-khit-zoloto-romb-zelenyy"
            },
            "wholesalePrice": 4590,
            "retailPrice": 6890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "910",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-113-1",
                "product-113-2",
                "product-113-3",
                "product-113-4"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                112,
                111,
                114
            ],
            "vendorId": 3451
        },
        {
            "id": 114,
            "name": "Хит золото, ромб красный, 2 секции",
            "slug": "stul-khit-section-zoloto-krasnyj",
            "category": "section",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-stulyev-khit-zoloto-romb-krasnyy"
            },
            "wholesalePrice": 4590,
            "retailPrice": 6890,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "910",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-114-1",
                "product-114-2",
                "product-114-3",
                "product-114-4"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                112,
                113,
                111
            ],
            "vendorId": 3453
        },
        {
            "id": 115,
            "name": "Хит серебро, ромб синий, 3 секции",
            "slug": "stul-khit-section-3-serebro-sinij",
            "category": "section",
            "color": "Синий",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-stulyev-khit-serebro-romb-siniy"
            },
            "wholesalePrice": 6990,
            "retailPrice": 10490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "1400",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-115-1",
                "product-115-2",
                "product-115-3",
                "product-115-4"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                116,
                117,
                118
            ],
            "vendorId": 3454
        },
        {
            "id": 116,
            "name": "Хит коричневый, ромб коричневый, 3 секции",
            "slug": "stul-khit-section-3-romb-korichnevyj",
            "category": "section",
            "color": "Коричневый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-iz-3-stulyev-khit-korichnevyy-romb-korichnevyy"
            },
            "wholesalePrice": 6990,
            "retailPrice": 10490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "1400",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-116-1",
                "product-116-2",
                "product-116-3"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                115,
                117,
                118
            ],
            "vendorId": 3584
        },
        {
            "id": 117,
            "name": "Хит золото, ромб зеленый, 3 секции",
            "slug": "stul-khit-section-3-zoloto-zelenyj",
            "category": "section",
            "color": "Зеленый",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-iz-3-stulyev-khit-zoloto-romb-zelenyy"
            },
            "wholesalePrice": 6990,
            "retailPrice": 10490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "1400",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-117-1",
                "product-117-2",
                "product-117-3"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                115,
                116,
                118
            ],
            "vendorId": 3575
        },
        {
            "id": 118,
            "name": "Хит золото, ромб красный, 3 секции",
            "slug": "stul-khit-section-3-zoloto-krasnyj",
            "category": "section",
            "color": "Красный ",
            "vendor": {
                "uri": "https://chiedocover.ru/product/sektsiya-iz-3-stulyev-khit-zoloto-romb-krasnyy"
            },
            "wholesalePrice": 6990,
            "retailPrice": 10490,
            "characteristics": [
                {
                    "name": "Ширина",
                    "value": "1400",
                    "unit": "мм"
                },
                {
                    "name": "Глубина",
                    "value": "570",
                    "unit": "мм"
                },
                {
                    "name": "Высота",
                    "value": "940",
                    "unit": "мм"
                },
                {
                    "name": "Материал каркаса",
                    "value": "сталь",
                    "unit": ""
                }
            ],
            "images": [
                "product-118-1",
                "product-118-2",
                "product-118-3"
            ],
            "relatedCategory": [
                {
                    "name": "",
                    "value": "",
                    "slug": ""
                }
            ],
            "relatedColor": [
                115,
                116,
                117
            ],
            "vendorId": 3585
        }
    ];
// Функция для обновления данных продукта с новой ценой
async function updateProductPrices() {    // Данные продуктов

    for (let product of products) {
        const url = product.vendor.uri;
        console.log(`Получение цены для ${product.name} с ${url}`);

        const prices = await fetchPrices(url);

        if (prices !== null) {
            product.wholesalePrice = prices.priceInt;
            product.oldWholePrice = prices.priceBen;
            product.mark = prices.priceMark;
        } else {
            console.log(`Не удалось получить цену для ${product.name} с ${url}`);
            product.wholesalePrice = 0;
            product.oldWholePrice = 0;
            product.mark = 0;
        }
    }

    fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Ошибка при сохранении файла:', err);
        } else {
            console.log('Данные успешно сохранены в products.json');
        }
    });
}

// Запуск обновления цен
updateProductPrices();
