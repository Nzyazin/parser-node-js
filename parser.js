const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');
const { URL } = require('url');
const { promisify } = require('util');
const pipeline1 = promisify(require('stream').pipeline);
const pipeline2 = promisify(require('stream').pipeline);

async function downloadImage(url, filepath, i, imgFilename) {
    const writer = createWriteStream(filepath);
    const response = await axios({
        url,
        responseType: 'stream'
    });

    if ( i === 0) {
        const secondaryPath = path.join(__dirname, 'product-tile', imgFilename);
        const writerSecondary = fs.createWriteStream(secondaryPath);
        await pipeline1(response.data, writerSecondary);
    }
    await pipeline2(response.data, writer);
}

async function fetchingImages(cheerio, url, id) {
    // Извлечение изображений
    const images = [];
    const imgElements = cheerio('.product__image');
    for (let i = 0; i < imgElements.length; i++) {
        const imgElement = imgElements.eq(i);
        const imgUrl = imgElement.attr('src');
        if (imgUrl) {
            // Создание уникального имени для изображения
            const imgExt = path.extname(new URL(imgUrl, url).pathname); // Получаем расширение файла
            const imgFilename = `product-${id}-${i + 1}${imgExt}`; // Формируем имя файла
            const imgFilenameWithoutExt = `product-${id}-${i + 1}`;
            const imgPath = path.join(__dirname, 'product', imgFilename); // Путь для сохранения изображения

            // Сохранение изображения
            await downloadImage(imgUrl, imgPath, i, imgFilename);

            // Добавляем путь к изображению в массив
            images.push(imgFilenameWithoutExt);
        }
    }
    console.log(images, 'images')
    return images;
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для загрузки и парсинга страницы
async function fetchPage(url, categoryOfUrls, id) {
    try {
        await delay(1000);
        // Отправка GET-запроса к странице
        const { data } = await axios.get(url);

        // Парсинг HTML с помощью cheerio
        const $ = cheerio.load(data);

        // Извлечение текста из h1.product__caption
        const name = $('h1.product__caption.caption').text().trim();

        const retailPrice = $('span.product-buy__price.fw_bold').text().trim();

        // Извлечение slug из URL
        const slug = url.split('/').filter(Boolean).pop();

        // Извлечение текста из третьего элемента breadcrumbs
        const breadcrumbItems = $('.crumbs__item');
        const categoryText = breadcrumbItems.eq(2).text().trim();

        // Определение категории
        let category = categoryOfUrls;

        const characteristics = [];
        $('.product-info__dimensions-item').each((i, elem) => {
            const name = $(elem).find('.product-info__dimensions-name').text().trim();
            const valueWithUnit = $(elem).find('.product-info__dimensions-value').text().trim();
            const [value, unit] = valueWithUnit.split(/\s+/); // Разделяем значение и единицу измерения

            characteristics.push({
                name,
                value,
                unit: unit || '' // Если единицы измерения нет, используем пустую строку
            });
        });

        const images = await fetchingImages($, url, id);

        const relatedProducts = [];

        // Вернуть данные в виде объекта
        return {
            id,
            name,
            slug,
            categories: [ category ],
            vendor: { uri: url },
            retailPrice,
            characteristics,
            images,
            relatedProducts
        };
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
    }
}

// Массив URL-адресов для парсинга
const urls = {
    'chairs': [
        'https://chiedocover.ru/product/stul-asol-svetlo-bezhevyy',
        'https://chiedocover.ru/product/stul-asol-korichnevyy',
        'https://chiedocover.ru/product/stul-cafe-stal',
        'https://chiedocover.ru/product/stul-alyuminiyevyy-bistro-bezhevyy',
        'https://chiedocover.ru/product/stul-cafe3-stal',
        'https://chiedocover.ru/product/stul-acapulso',
        'https://chiedocover.ru/product/stul-cafe3-alyuminiy',
        'https://chiedocover.ru/product/stul-cafe2-alyuminiy',
        'https://chiedocover.ru/product/stul-nant',
        'https://chiedocover.ru/product/stul-nant2',
        'https://chiedocover.ru/product/stul-rivyera-iz-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/stul-barnyy-nola-bez-spinki-iskusstvennyy-rotang',
        'https://chiedocover.ru/product/stul-lion',
        'https://chiedocover.ru/product/pletennyy-stul-kameya-latte',
        'https://chiedocover.ru/product/stul-sadovyy-toronto-seryy',
        'https://chiedocover.ru/product/stul-sadovyy-toronto-antratsit',
        'https://chiedocover.ru/product/stul-sadovyy-maui-slonovaya-kost',
        'https://chiedocover.ru/product/stul-sadovyy-maui-mokko',
        'https://chiedocover.ru/product/stul-barnyy-nola-iz-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/stul-barnyy-pont',
        'https://chiedocover.ru/product/stul-okeanik-s-vysokoy-spinkoy',
        'https://chiedocover.ru/product/stul-barnyy-siesta',
        'https://chiedocover.ru/product/stul-terrasa-pletenyy',
        'https://chiedocover.ru/product/stul-manali-s-podushkoy-korichnevyy',
        'https://chiedocover.ru/product/stul-manali-s-podushkoy-belyy',
        'https://chiedocover.ru/product/stul-ginza-pletenyy',
        'https://chiedocover.ru/product/barnyy-stul-geometriya',
        'https://chiedocover.ru/product/stul-kapri-chernyy',
        'https://chiedocover.ru/product/stul-kapri-bezhevyy',
        'https://chiedocover.ru/product/stul-pierre-iskusstvennyy-rotang-massiv-buka',
        'https://chiedocover.ru/product/stul-amarone-belyy-podushka-chernaya',
        'https://chiedocover.ru/product/stul-gavana-pletenyy-bezhevyy-podushka-chernaya',
        'https://chiedocover.ru/product/stul-malibu-belyy',
        'https://chiedocover.ru/product/stul-malibu-bezhevyy',
        'https://chiedocover.ru/product/stul-barbados-bezhevyy',
        'https://chiedocover.ru/product/stul-sitsiliya-s-podushkoy',
        'https://chiedocover.ru/product/stul-barnyy-malibu-bezhevyy',
        'https://chiedocover.ru/product/stul-polubarnyy-malibu-bezhevyy',
        'https://chiedocover.ru/product/stul-tsesena-s-podushkoy',
        'https://chiedocover.ru/product/stul-palermo-pletenyy-bezhevyy',
        'https://chiedocover.ru/product/stul-palermo-pletenyy-temno-bezhevyy',
        'https://chiedocover.ru/product/stul-aspen-pletenyy-temno-bezhevyy',
        'https://chiedocover.ru/product/stul-aspen-pletenyy-seryy',
        'https://chiedocover.ru/product/stul-viaredzho-pletenyy-seryy',
        'https://chiedocover.ru/product/stul-viaredzho-pletenyy-bezhevyy',
        'https://chiedocover.ru/product/stul-portofino-pletenyy-bezhevyy',
    ],
    'tables': [
        'https://chiedocover.ru/product/kanpur-stol-kofeynyy-pryamougolnyy-naturalnyy',
        'https://chiedocover.ru/product/kanpur-stol-kofeynyy-pryamougolnyy-seryy',
        'https://chiedocover.ru/product/kanpur-stol-kofeynyy-pryamougolnyy-korichnevyy',
        'https://chiedocover.ru/product/kunur-stol-kofeynyy-kruglyy-seryy',
        'https://chiedocover.ru/product/kunur-stol-kofeynyy-kruglyy-naturalnyy',
        'https://chiedocover.ru/product/kunur-stol-kofeynyy-kruglyy-korichnevyy',
        'https://chiedocover.ru/product/manali-stol-kofeynyy-kvadratnyy-seryy',
        'https://chiedocover.ru/product/manali-stol-kofeynyy-kvadratnyy-naturalnyy',
        'https://chiedocover.ru/product/manali-stol-kofeynyy-kvadratnyy-korichnevyy',
        'https://chiedocover.ru/product/stol-obedennyy-kruglyy-dakhey-naturalnyy',
        'https://chiedocover.ru/product/stol-obedennyy-kruglyy-dakhey-korichnevyy',
        'https://chiedocover.ru/product/stol-obedennyy-kruglyy-dakhey-belyy',
        'https://chiedocover.ru/product/stol-verona',
        'https://chiedocover.ru/product/stol-fodzha-80',
        'https://chiedocover.ru/product/daman-obedennyy-pryamougolnyy-6-mest-seryy',
        'https://chiedocover.ru/product/daman-obedennyy-pryamougolnyy-6-mest-naturalnyy',
        'https://chiedocover.ru/product/daman-obedennyy-pryamougolnyy-6-mest-korichnevyy',
        'https://chiedocover.ru/product/stol-tenerife',
        'https://chiedocover.ru/product/stol-kofeynyy-malvan-korichnevyy',
        'https://chiedocover.ru/product/stol-kofeynyy-malvan-belyy',
        'https://chiedocover.ru/product/ctol-layt-800x800',
        'https://chiedocover.ru/product/stol-fudzhi-80kh80',
        'https://chiedocover.ru/product/stol-sals',
        'https://chiedocover.ru/product/kofeynyy-stol-launzh',
        'https://chiedocover.ru/product/stol-avellino-iz-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/stol-cafe3',
        'https://chiedocover.ru/product/stol-cafe2',
        'https://chiedocover.ru/product/kofeynyy-stol-voyazh-50kh50',
        'https://chiedocover.ru/product/kofeynyy-stolik-siyena',
        'https://chiedocover.ru/product/stol-sadovyy-vurfel-slonovaya-kost',
        'https://chiedocover.ru/product/zhurnalnyy-stol-veranda',
        'https://chiedocover.ru/product/stol-zhurnalnyy-grand',
        'https://chiedocover.ru/product/zhurnalnyy-stol-terrasa-95kh65',
        'https://chiedocover.ru/product/stol-zhurnalnyy-grand-2',
        'https://chiedocover.ru/product/stol-gella-iz-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/stol-veranda-80',
        'https://chiedocover.ru/product/dolpur-stol-kruglyy-korichnevyy',
        'https://chiedocover.ru/product/dolpur-stol-kruglyy-bezhevyy',
        'https://chiedocover.ru/product/dolpur-stol-kruglyy-seryy',
        'https://chiedocover.ru/product/stol-corrento-900x900',
        'https://chiedocover.ru/product/stol-kofeynyy-dakhey-seryy',
        'https://chiedocover.ru/product/stol-kofeynyy-dakhey-korichnevyy',
        'https://chiedocover.ru/product/zhurnalnyy-stol-siyena',
        'https://chiedocover.ru/product/khassan-stol-obedennyy-pryamougolnyy-6-mest-seryy',
        'https://chiedocover.ru/product/khassan-stol-obedennyy-pryamougolnyy-6-mest-naturalnyy',
        'https://chiedocover.ru/product/khassan-stol-obedennyy-pryamougolnyy-6-mest-korichnevyy',
        'https://chiedocover.ru/product/stol-sadovyy-toronto-80-antratsit',
        'https://chiedocover.ru/product/stol-sadovyy-toronto-80-seryy',
        'https://chiedocover.ru/product/stol-sadovyy-panama-mokka',
        'https://chiedocover.ru/product/stol-sadovyy-panama-tabak',
        'https://chiedocover.ru/product/stol-voyazh-800x800',
        'https://chiedocover.ru/product/stol-corrento-1200x900',
        'https://chiedocover.ru/product/dzhammu-stol-obedennyy-pryamougolnyy-8-mest-seryy',
        'https://chiedocover.ru/product/dzhammu-stol-obedennyy-pryamougolnyy-8-mest-bezhevyy',
        'https://chiedocover.ru/product/nerul-stol-obedennyy-ovalnyy-seryy',
        'https://chiedocover.ru/product/nerul-stol-obedennyy-ovalnyy-naturalnyy',
        'https://chiedocover.ru/product/nerul-stol-obedennyy-ovalnyy-korichnevyy',
        'https://chiedocover.ru/product/stol-obedennyy-ovalnyy-faridabad'
    ],
    'sofas': [
        'https://chiedocover.ru/product/pletenyy-divan-klonbern',
        'https://chiedocover.ru/product/pletenyy-divan-kiltum',
        'https://chiedocover.ru/product/pletenyy-divan-fudzhi',
        'https://chiedocover.ru/product/divan-sorrento-iz-pletenogo-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/pletenyy-divan-iz-iskusstvennogo-rotanga-glassan-latte',
        'https://chiedocover.ru/product/pletenyy-divan-iz-iskusstvennogo-rotanga-glassan-svetlo-korichnevyy',
        'https://chiedocover.ru/product/pletenyy-divan-iz-iskusstvennogo-rotanga-glassan',
        'https://chiedocover.ru/product/divan-asgard-2-kh-mestnyy',
        'https://chiedocover.ru/product/divan-asti',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkoy-miami-lounge-sofa-korichnevyy',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkoy-miami-lounge-sofa-belyy',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkoy-miami-lounge-sofa-antratsit',
        'https://chiedocover.ru/product/divan-grand-2-kh-mestnyy',
        'https://chiedocover.ru/product/pletenyy-divan-gort-korichnevyy',
        'https://chiedocover.ru/product/pletenyy-divan-s59b-w65-light-brown',
        'https://chiedocover.ru/product/pletenyy-divan-s59b-w85-latte',
        'https://chiedocover.ru/product/divan-pryamoy-launzh',
        'https://chiedocover.ru/product/divan-veil-2-kh-mestnyy',
        'https://chiedocover.ru/product/pletenyy-divan-transformer-ardkong-seryy',
        'https://chiedocover.ru/product/divan-grand-3-kh-mestnyy',
        'https://chiedocover.ru/product/divan-2kh-mestnyy-vermont-pletenyy',
        'https://chiedocover.ru/product/divan-2kh-mestnyy-launzh',
        'https://chiedocover.ru/product/divan-romardi-iz-pletenogo-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkami-monaco-lounge-chernyy',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkami-monaco-lounge-belyy',
        'https://chiedocover.ru/product/divan-pryamoy-launzh-s-yashchikom',
        'https://chiedocover.ru/product/divan-2-kh-mestnyy-sorrento',
        'https://chiedocover.ru/product/divan-veil-3-kh-mestnyy',
        'https://chiedocover.ru/product/divan-uglovoy-launzh-box-levyy',
        'https://chiedocover.ru/product/divan-3kh-mestnyy-vermont-pletenyy',
        'https://chiedocover.ru/product/divan-2-kh-mestnyy-siyena',
        'https://chiedocover.ru/product/divan-pletenyy-kvar',
        'https://chiedocover.ru/product/divan-3-kh-mestnyy-sorrento',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkami-monaco-lounge-xl-antratsit',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-s-podushkami-monaco-lounge-venge',
        'https://chiedocover.ru/product/divan-3kh-mestnyy-launzh-box',
        'https://chiedocover.ru/product/divan-2kh-mestnyy-ravello-pletenyy',
        'https://chiedocover.ru/product/divan-3-y-mestnyy-siyena',
        'https://chiedocover.ru/product/divan-3-y-mestnyy-ravello',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-uglovoy-s-podushkami-monaco-lounge-corner-korichnevyy',
        'https://chiedocover.ru/product/divan-plastikovyy-pletenyy-uglovoy-s-podushkami-monaco-lounge-corner-belyy',
        'https://chiedocover.ru/product/divan-krovat-rino',
        'https://chiedocover.ru/product/divan-krovat-grins'
    ],
    'armchairs': [
        'https://chiedocover.ru/product/kreslo-pletenoye-chennai-seroye',
        'https://chiedocover.ru/product/kreslo-pletenoye-chennai-naturalnoye',
        'https://chiedocover.ru/product/kreslo-pletenoye-chennai-korichnevoye',
        'https://chiedocover.ru/product/kreslo-pletenoye-chennai-beloye',
        'https://chiedocover.ru/product/kreslo-sadovoye-nitstsa-tabak',
        'https://chiedocover.ru/product/kreslo-sadovoye-nitstsa-pod-kozhu',
        'https://chiedocover.ru/product/kreslo-sadovoye-florents-chernyy',
        'https://chiedocover.ru/product/kreslo-sadovoye-florents-bezhevyy',
        'https://chiedocover.ru/product/kreslo-sadovoye-aruba-pod-kozhu',
        'https://chiedocover.ru/product/kreslo-sadovoye-aruba-slonovaya-kost',
        'https://chiedocover.ru/product/kreslo-sadovoye-aruba-mokko',
        'https://chiedocover.ru/product/kreslo-sadovoye-aruba-chernoye',
        'https://chiedocover.ru/product/kreslo-sadovoye-borneo-chernoye',
        'https://chiedocover.ru/product/kreslo-sadovoye-san-marino-bezhevyy',
        'https://chiedocover.ru/product/kreslo-sadovoye-borneo-slonovaya-kost',
        'https://chiedocover.ru/product/kreslo-sadovoye-borneo-mokko',
        'https://chiedocover.ru/product/kreslo-sadovoye-borneo-med',
        'https://chiedocover.ru/product/kreslo-sadovoye-borneo-pod-kozhu',
        'https://chiedocover.ru/product/kreslo-sadovoye-porto-tabak',
        'https://chiedocover.ru/product/kreslo-sadovoye-porto-chernoye',
        'https://chiedocover.ru/product/kreslo-sadovoye-porto-mokko',
        'https://chiedocover.ru/product/kreslo-sadovoye-san-marino-korichnevyy',
        'https://chiedocover.ru/product/kreslo-sadovoye-milan-tabak',
        'https://chiedocover.ru/product/kreslo-sadovoye-milan-chernyy',
        'https://chiedocover.ru/product/kreslo-sadovoye-milan-pod-kozhu',
        'https://chiedocover.ru/product/kreslo-sadovoye-maui-slonovaya-kost',
        'https://chiedocover.ru/product/kreslo-sadovoye-maui-mokko',
        'https://chiedocover.ru/product/kreslo-sadovoye-toronto-antratsit',
        'https://chiedocover.ru/product/kreslo-sadovoye-rim-tabak',
        'https://chiedocover.ru/product/kreslo-sadovoye-rim-mokka',
        'https://chiedocover.ru/product/kreslo-sadovoye-rim-chernoye',
        'https://chiedocover.ru/product/kreslo-manali',
        'https://chiedocover.ru/product/kreslo-sadovoye-lugano-mokka-s-podushkoy',
        'https://chiedocover.ru/product/kreslo-sadovoye-lugano-tabak-s-podushkoy',
        'https://chiedocover.ru/product/kreslo-sadovoye-lugano-chernyy-s-podushkoy',
        'https://chiedocover.ru/product/kreslo-sadovoye-lugano-slonovaya-kost-s-podushkoy',
        'https://chiedocover.ru/product/kreslo-sadovoye-lugano-pod-kozhu-s-podushkoy',
        'https://chiedocover.ru/product/kreslo-podvesnoye-bredbyn-iz-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/kreslo-gurgaon-korichnevyy',
        'https://chiedocover.ru/product/kreslo-sadovoye-garda-slonovaya-kost',
        'https://chiedocover.ru/product/kreslo-sadovoye-garda-mokko',
        'https://chiedocover.ru/product/kreslo-sadovoye-garda-tabak',
        'https://chiedocover.ru/product/kreslo-sadovoye-garda-granit',
        'https://chiedocover.ru/product/kreslo-sadovoye-garda-pod-kozhu',
        'https://chiedocover.ru/product/kreslo-diu-korichnevyy',
        'https://chiedocover.ru/product/kreslo-diu-belyy',
        'https://chiedocover.ru/product/kreslo-morzhim-belyy',
        'https://chiedocover.ru/product/kreslo-morzhim-korichnevyy',
        'https://chiedocover.ru/product/kreslo-morzhim-seryy',
        'https://chiedocover.ru/product/kreslo-ravenna-temno-korichnevoye',
        'https://chiedocover.ru/product/kreslo-ravenna-solomennoye',
        'https://chiedocover.ru/product/kreslo-asti',
        'https://chiedocover.ru/product/kreslo-latte-korichnevoye',
        'https://chiedocover.ru/product/kreslo-latte-solomennoye',
    ],
    'furniture-sets': [
        'https://chiedocover.ru/product/komplekt-mebeli-sidney-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-sidney-2-stula-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-sidney-2-stula-kapuchino',
        'https://chiedocover.ru/product/komplekt-mebeli-myuri-brown',
        'https://chiedocover.ru/product/komplekt-mebeli-garsiya-brown',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-fernando-chernyy-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-ravenna-latte',
        'https://chiedocover.ru/product/komplekt-chennai-2-s-kruglym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-2-s-kruglym-stolom-naturalnyy',
        'https://chiedocover.ru/product/komplekt-chennai-2-s-kruglym-stolom-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-alme-korichnevyy-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-korichnevyy-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-midlend-2-stula-svetlo-korichnevyy',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-fernando-latte-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-latte-2-stula-stoleshnitsa-kruglaya',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-korichnevyy-2-stula-kruglaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-myuri-beige-kruglaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-velli-latte-2-stula-kvadratnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-velli-latte-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-4-stula-kapuchino',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-4-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-almebrown-4-stula-pryamougolnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-alme-light-brown-4-stula-kvadratnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-alme-light-brown-4-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-bronks-korichnevyy-2-mesta',
        'https://chiedocover.ru/product/komplekt-mebeli-bronks-brown',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-maykao-latte',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-latte-2-stula-kruglaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-korichnevyy-2-stula-kruglaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-korichnevyy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kruglym-stolom-belyy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kruglym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kruglym-stolom-naturalnyy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kruglym-stolom-korichnevyy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kvadratnym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kvadratnym-stolom-naturalnyy',
        'https://chiedocover.ru/product/komplekt-chennai-4-s-kvadratnym-stolom-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-allen-brown',
        'https://chiedocover.ru/product/komplekt-mebeli-allen-white',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-korichnevyy-4-stula-stoleshnitsa-kruglaya',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-fernando-latte-4-stula',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-fernando-latte',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-lakross-chernyy',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-lakross-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-velli-latte-4-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-alme-latte',
        'https://chiedocover.ru/product/komplekt-mebeli-spring-brown-4-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-midlend-4-stula-korichnevyy-pryamougolnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-orlando-set-with-3-seat-sofa',
        'https://chiedocover.ru/product/komplekt-corfu-relax',
        'https://chiedocover.ru/product/komplekt-mebeli-midlend-6-stulyev-korichnevyy',
        'https://chiedocover.ru/product/komplekt-chennai-6-s-pryamougolnym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-6-s-pryamougolnym-stolom-naturalnyy',
        'https://chiedocover.ru/product/komplekt-chennai-6-s-pryamougolnym-stolom-korichnevyy',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-maykao-latte-4-stula-kruglaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-pletenoy-mebeli-maykao-latte-4-stula',
        'https://chiedocover.ru/product/4',
        'https://chiedocover.ru/product/komplekt-mebeli-charlston-4-stula-brown',
        'https://chiedocover.ru/product/komplekt-mebeli-lenkoys-latte-4-stula',
        'https://chiedocover.ru/product/komplekt-chennai-plus-6-s-kruglym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-6-s-kruglym-stolom-naturalnyy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-6-s-kruglym-stolom-korichnevyy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-6-s-pryamougolnym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-6-s-pryamougolnym-stolom-naturalnyy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-6-s-pryamougolnym-stolom-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-temno-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-brown-kvadratnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-latte',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-brown',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-bezhevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-latte',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-korichnevyy-4-stula-kvadratnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-salemo-set-with-3-seat-sofa',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-korichnevyy-4-stula-pryamougolnaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-korichnevyy-4-stula-kruglaya-stoleshnitsa',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-4-stula-svetlo-korichnevyy',
        'https://chiedocover.ru/product/komplekt-betul-seryy',
        'https://chiedocover.ru/product/komplekt-betul-bezhevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-kvadratnaya-stoleshnitsa-latte',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-latte',
        'https://chiedocover.ru/product/komplekt-nukh-belyy',
        'https://chiedocover.ru/product/pletenyy-komplekt-dlya-otdykha-ankapalle-2-stula',
        'https://chiedocover.ru/product/komplekt-mebeli-bronks-latte',
        'https://chiedocover.ru/product/komplekt-mebeli-midlend-4-stula-korichnevyy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-8-seryy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-8-bezhevyy',
        'https://chiedocover.ru/product/komplekt-chennai-plus-8-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-6-stulyev-brown',
        'https://chiedocover.ru/product/komplekt-mebeli-frankfurt-6-stulyev-beige',
        'https://chiedocover.ru/product/komplekt-dirang-korichnevyy',
        'https://chiedocover.ru/product/komplekt-chiplun-belyy',
        'https://chiedocover.ru/product/komplekt-dirang-belyy',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-latte-2-divana',
        'https://chiedocover.ru/product/pletenyy-komplekt-dlya-otdykha-ankapalle-bezhevyy',
        'https://chiedocover.ru/product/pletenyy-komplekt-dlya-otdykha-ankapalle',
        'https://chiedocover.ru/product/komplekt-mebeli-alme-brown-2-skameyki',
        'https://chiedocover.ru/product/komplekt-mebeli-linkoln-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-enfild-korichnevyy-4-kresla',
        'https://chiedocover.ru/product/komplekt-vagamon-belyy',
        'https://chiedocover.ru/product/komplekt-vagamon-korichnevyy',
        'https://chiedocover.ru/product/malyy-barnyy-nabor-korichnevyy',
        'https://chiedocover.ru/product/malyy-barnyy-nabor-tabak',
        'https://chiedocover.ru/product/malyy-barnyy-nabor-granit',
        'https://chiedocover.ru/product/malyy-barnyy-nabor-mokko',
        'https://chiedocover.ru/product/komplekt-daman-korichnevyy',
        'https://chiedocover.ru/product/komplekt-daman-belyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-8-stulyev-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-6-stulyev-svetlo-korichnevyy',
        'https://chiedocover.ru/product/barnyy-komplekt-mebeli-dzhordzh-6-posadochnykh-mest-seryy',
        'https://chiedocover.ru/product/barnyy-komplekt-mebeli-dzhordzh-6-posadochnykh-mest-korichnevyy',
        'https://chiedocover.ru/product/komplekt-osianr-bezhevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-8-stulyev-svetlo-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-10-posadochnykh-mest-korichnevyy',
        'https://chiedocover.ru/product/komplekt-vagator-seryy',
        'https://chiedocover.ru/product/komplekt-vagator-korichnevyy',
        'https://chiedocover.ru/product/komplekt-florida-slonovaya-kost',
        'https://chiedocover.ru/product/komplekt-florida-granit',
        'https://chiedocover.ru/product/komplekt-florida-pod-kozhu',
        'https://chiedocover.ru/product/komplekt-nagda-seryy',
        'https://chiedocover.ru/product/komplekt-ropar-seryy',
        'https://chiedocover.ru/product/komplekt-ropar-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-8-posadochnykh-mest-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-avrora-8-posadochnykh-mest-svetlo-korichnevyy',
        'https://chiedocover.ru/product/komplekt-mebeli-palantina-bezhevyy',
        'https://chiedocover.ru/product/komplekt-shimla-s-kruglym-stolom-seryy',
        'https://chiedocover.ru/product/komplekt-vayanad-seryy',
        'https://chiedocover.ru/product/komplekt-kumili-seryy',
        'https://chiedocover.ru/product/komplekt-kumili-korichnevyy',
        'https://chiedocover.ru/product/komplekt-shimla-s-pryamougolnym-stolom-seryy',
    ],
    'loungers': [
        'https://chiedocover.ru/product/shezlong-iz-rotanga-kleopatra',
        'https://chiedocover.ru/product/lezhak-shezlong-viko-rotang-iskusstvennyy',
        'https://chiedocover.ru/product/shezlong-ksin-seryy',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-barri-brown',
        'https://chiedocover.ru/product/lezhak-richchi-bezhevyy',
        'https://chiedocover.ru/product/shezlong-khassan-seryy',
        'https://chiedocover.ru/product/shezlong-khassan-korichnevyy',
        'https://chiedocover.ru/product/shezlong-iz-rotanga-korichnevyy',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-barri-temno-korichnevyy',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-barri-korichnevyy',
        'https://chiedocover.ru/product/lezhak-malta-2-kofeynyy',
        'https://chiedocover.ru/product/shezlong-osian-goluboy',
        'https://chiedocover.ru/product/shezlong-plastikovyy-s-matrasom-gs-1009-korichnevyy',
        'https://chiedocover.ru/product/shezlong-plastikovyy-s-matrasom-gs-1009-antratsit',
        'https://chiedocover.ru/product/shezlong-plastikovyy-s-matrasom-gs-1009-belyy',
        'https://chiedocover.ru/product/shezlong-romardi-iz-iskusstvennogo-rotanga',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-mare-latte',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-barri-svetlo-korichnevyy',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-barri-svetlo-korichnevyy-bez-kolesikov',
        'https://chiedocover.ru/product/shezlong-iz-rotanga-modern',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-mare-korichnevyy',
        'https://chiedocover.ru/product/shezlong-lezhak-pletenyy-barri-latte',
        'https://chiedocover.ru/product/shezlong-iz-rotanga-veranda',
    ],
    'poufs': [
         'https://chiedocover.ru/product/puf-iz-iskusstvennogo-rotanga-korichnevyy',
         'https://chiedocover.ru/product/stolpuf-grand2',
         'https://chiedocover.ru/product/puf-launzh-40kh40-pletenyy',
         'https://chiedocover.ru/product/puf-indor',
         'https://chiedocover.ru/product/puf-voyazh-rotang',
         'https://chiedocover.ru/product/zhurnalnyy-stol-launzh-70kh70-pletenyy',
         'https://chiedocover.ru/product/stolpuf-grand',
         'https://chiedocover.ru/product/puf-launzh-1380x720'
    ]
};

if (!fs.existsSync(path.join(__dirname, 'product'))) {
    fs.mkdirSync(path.join(__dirname, 'product'));
}

if (!fs.existsSync(path.join(__dirname, 'product-tile'))) {
    fs.mkdirSync(path.join(__dirname, 'product-tile'));
}

// Парсинг всех страниц и сохранение в JSON
(async () => {
    const products = [];
    let id = 1;
    for (const [category, categoryUrls] of Object.entries(urls)) {
        console.log(`Processing category: ${category}`);
        const totalUrls = categoryUrls.length;

        for (let i = 0; i < totalUrls; i++) {
            const url = categoryUrls[i];
            const data = await fetchPage(url, category, id);

            if (data) {
                products.push(data);
            }

            // Расчет процента выполнения
            const progress = ((i + 1) / totalUrls) * 100;
            console.log(`Category: ${category} - Progress: ${progress.toFixed(2)}% (${i + 1} of ${totalUrls})`);

            id++;
        }
    }

    fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data successfully saved to products.json');
        }
    });
})();
