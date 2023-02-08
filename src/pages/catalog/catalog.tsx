import React from 'react';
import Banner from '../../components/banner/banner';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { PRODUCTS_PER_PAGE } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process-selectors';
import { Product } from '../../types/types';

const cameras: Product[] = [
  {
    id: 1,
    name: 'Ретрокамера Dus Auge lV',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
    previewImg: 'img/content/das-auge.jpg',
    level: 'Любительский',
    rating: 4,
    price: 73450,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    reviewCount: 10
  },
  {
    id: 2,
    name: 'FastShot MR-5',
    vendorCode: 'JH34KHN895',
    type: 'Моментальная',
    category: 'Фотоаппарат',
    description: 'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
    previewImg: 'img/content/fast-shot.jpg',
    level: 'Любительский',
    rating: 3,
    price: 18970,
    previewImg2x: 'img/content/fast-shot@2x.jpg',
    previewImgWebp: 'img/content/fast-shot.webp',
    previewImgWebp2x: 'img/content/fast-shot@2x.webp',
    reviewCount: 11
  },
  {
    id: 3,
    name: 'Instaprinter P2',
    vendorCode: 'KLU789GH56',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
    previewImg: 'img/content/instaprinter.jpg',
    level: 'Нулевой',
    rating: 5,
    price: 8430,
    previewImg2x: 'img/content/instaprinter@2x.jpg',
    previewImgWebp: 'img/content/instaprinter.webp',
    previewImgWebp2x: 'img/content/instaprinter@2x.webp',
    reviewCount: 9
  },
  {
    id: 4,
    name: 'Орлёнок',
    vendorCode: 'O78DFGSD83',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description: 'Плёночная перезаряжаемая камера нового покаления уже укомплектована плёнкой и оснащена встроенной вспышкой. Легко помещается в руке и обладет интересным дизайном.',
    previewImg: 'img/content/orlenok.jpg',
    level: 'Любительский',
    rating: 3,
    price: 19970,
    previewImg2x: 'img/content/orlenok@2x.jpg',
    previewImgWebp: 'img/content/orlenok.webp',
    previewImgWebp2x: 'img/content/orlenok@2x.webp',
    reviewCount: 15
  },
  {
    id: 5,
    name: 'Van Shot',
    vendorCode: 'YU7RT5GH76',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Крайне редкое наименование не потеряло актуальность не смотря на сможество альтернатив. После съёмок на данную камеру фильм не стыдно показать в рамках кинофестиваля. Первые 4К настройки, высочайшее разрешение, уникальная цветопередача.',
    previewImg: 'img/content/van-shot.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 149990,
    previewImg2x: 'img/content/van-shot@2x.jpg',
    previewImgWebp: 'img/content/van-shot.webp',
    previewImgWebp2x: 'img/content/van-shot@2x.webp',
    reviewCount: 9
  },
  {
    id: 6,
    name: 'Click Sap',
    vendorCode: 'KLN54H76F5',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description: 'Зеркальная камера позволяющая делать четкие фотографии. Вспышка продается и подключается отдельно. Чехол в комплекте. Плёнка 35мм',
    previewImg: 'img/content/click-sap.jpg',
    level: 'Любительский',
    rating: 3,
    price: 9490,
    previewImg2x: 'img/content/click-sap@2x.jpg',
    previewImgWebp: 'img/content/click-sap.webp',
    previewImgWebp2x: 'img/content/click-sap@2x.webp',
    reviewCount: 1
  },
  {
    id: 7,
    name: 'Look 54',
    vendorCode: 'NB54Y',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Профессиональный зеркальный фотоаппарат оснащен 56-кратным зумом, позволяет создавать чёткие снимки, а новейший процессор позволяет справляться с шумами и светочувствительностью.',
    previewImg: 'img/content/look-54.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 96490,
    previewImg2x: 'img/content/look-54@2x.jpg',
    previewImgWebp: 'img/content/look-54.webp',
    previewImgWebp2x: 'img/content/look-54@2x.webp',
    reviewCount: 6
  },
  {
    id: 8,
    name: 'Look SF3',
    vendorCode: 'NBSF3',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Идеальная камера для старта в репортажной фотографии. оснащена встроенным стабилизатором и вспышкой. Оптический 15 кратный зум и удобная посадка в руке. ',
    previewImg: 'img/content/look-sf3.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 63800,
    previewImg2x: 'img/content/look-sf3@2x.jpg',
    previewImgWebp: 'img/content/look-sf3.webp',
    previewImgWebp2x: 'img/content/look-sf3@2x.webp',
    reviewCount: 10
  },
  {
    id: 9,
    name: 'Van60',
    vendorCode: 'YU7RTVA60',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Супер-компактная модель с оптическим зумом проста в управлении и настройка. Отличная первая камера для юных фотографов-исследователей, а яркие расцветки корпуска подчеркнут их индивидуальность.',
    previewImg: 'img/content/van60.jpg',
    level: 'Нулевой',
    rating: 2,
    price: 5690,
    previewImg2x: 'img/content/van60@2x.jpg',
    previewImgWebp: 'img/content/van60.webp',
    previewImgWebp2x: 'img/content/van60@2x.webp',
    reviewCount: 18
  },
  {
    id: 10,
    name: 'Van Click',
    vendorCode: 'YU7RTCV72',
    type: 'Моментальная',
    category: 'Фотоаппарат',
    description: '10-кратный зум, поворотный ЖК-экран, встроенная вспышка, запись видео в двух форматах, следящий автофокус — максимум возможности за лучшую цену.',
    previewImg: 'img/content/van-click.jpg',
    level: 'Любительский',
    rating: 3,
    price: 24590,
    previewImg2x: 'img/content/van-click@2x.jpg',
    previewImgWebp: 'img/content/van-click.webp',
    previewImgWebp2x: 'img/content/van-click@2x.webp',
    reviewCount: 18
  },
  {
    id: 11,
    name: 'SP 520',
    vendorCode: 'JQ756',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Делайте лучшие фильмы в высоком разрешении. Лёгкая в управлении, мощная начинка, реалистичная цветопередача, возможность просмотра отснятого материала через поворотный ЖК-экран и передача видео через систему Bluetooth.',
    previewImg: 'img/content/sp-520.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 105590,
    previewImg2x: 'img/content/sp-520@2x.jpg',
    previewImgWebp: 'img/content/sp-520.webp',
    previewImgWebp2x: 'img/content/sp-520@2x.webp',
    reviewCount: 19
  },
  {
    id: 12,
    name: 'Look Shot',
    vendorCode: 'NB569SH',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Гибридный автофокус и динамический стабилизатор по приятной цене. Светочувствительная матрица  без шумов. 8-кратный выездной зум в стильной упаковке.',
    previewImg: 'img/content/look-shot.jpg',
    level: 'Любительский',
    rating: 4,
    price: 18590,
    previewImg2x: 'img/content/look-shot@2x.jpg',
    previewImgWebp: 'img/content/look-shot.webp',
    previewImgWebp2x: 'img/content/look-shot@2x.webp',
    reviewCount: 2
  },
  {
    id: 13,
    name: 'Look Shot 5',
    vendorCode: 'NB569SH5',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description: 'Аутентичный фотоаппарат для любителей старины. Работает от аккумуляторных батареек. Чехол в комплекте',
    previewImg: 'img/content/look-shot-5.jpg',
    level: 'Нулевой',
    rating: 2,
    price: 4990,
    previewImg2x: 'img/content/look-shot-5@2x.jpg',
    previewImgWebp: 'img/content/look-shot-5.webp',
    previewImgWebp2x: 'img/content/look-shot-5@2x.webp',
    reviewCount: 19
  },
  {
    id: 14,
    name: 'See Shot',
    vendorCode: 'SS56GH',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Компактная модель с выездным зумом и скрытой вспышкой. Встроенная стабилизация изображения, можно снимать прямо в движении. Свеочувствительная матрица, передача информации через  Bluetooth. Возможность выстраивать ручные параметры.',
    previewImg: 'img/content/see-shot.jpg',
    level: 'Любительский',
    rating: 3,
    price: 26990,
    previewImg2x: 'img/content/see-shot@2x.jpg',
    previewImgWebp: 'img/content/see-shot.webp',
    previewImgWebp2x: 'img/content/see-shot@2x.webp',
    reviewCount: 4
  },
  {
    id: 15,
    name: 'SS 54F',
    vendorCode: 'SS54FGH',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Ручной режим позволяет самостоятельно настраивать параметры съёмки. 20-мегапиксельный сенсор, автофокус и встроенная светокоррекция. Маленькая камера для большихфотовозможностей. ',
    previewImg: 'img/content/ss-54f.jpg',
    level: 'Любительский',
    rating: 4,
    price: 37990,
    previewImg2x: 'img/content/ss-54f@2x.jpg',
    previewImgWebp: 'img/content/ss-54f.webp',
    previewImgWebp2x: 'img/content/ss-54f@2x.webp',
    reviewCount: 12
  },
  {
    id: 16,
    name: 'Small Shot 4',
    vendorCode: 'SS4CFR9',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Для начинающего оператора: познакомьте вашего наблюдателя с его первой камерой. Оптический зум, жк-экран, светочувствительная матрица - стильный кейс для транспортировки. ',
    previewImg: 'img/content/small-shot-4.jpg',
    level: 'Нулевой',
    rating: 1,
    price: 9990,
    previewImg2x: 'img/content/small-shot-4@2x.jpg',
    previewImgWebp: 'img/content/small-shot-4.webp',
    previewImgWebp2x: 'img/content/small-shot-4@2x.webp',
    reviewCount: 11
  },
  {
    id: 17,
    name: 'Look Identify',
    vendorCode: 'LD2000',
    type: 'Коллекционная',
    category: 'Фотоаппарат',
    description: 'Среднеформатная 40-мегапиксельная камера обладет уникальным непоторимым дизайном и ручной росписью корпуса. Ориентирована на студийную съёмку, имеет полный кадр --  35-мм сенсор ',
    previewImg: 'img/content/look-identify.jpg',
    level: 'Любительский',
    rating: 5,
    price: 126000,
    previewImg2x: 'img/content/look-identify@2x.jpg',
    previewImgWebp: 'img/content/look-identify.webp',
    previewImgWebp2x: 'img/content/look-identify@2x.webp',
    reviewCount: 4
  },
  {
    id: 18,
    name: 'LI Shot 76',
    vendorCode: 'LIS76FD',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Профессиональная панорамная камера способна создать круговой фото за 20 секунд с помощью  процессора. Новинка на рынке цифровой фотографии -- для неё не нужен штатив или любой другой дополнительный инструмент.',
    previewImg: 'img/content/li-shot-76.jpg',
    level: 'Профессиональный',
    rating: 4,
    price: 94590,
    previewImg2x: 'img/content/li-shot-76@2x.jpg',
    previewImgWebp: 'img/content/li-shot-76.webp',
    previewImgWebp2x: 'img/content/li-shot-76@2x.webp',
    reviewCount: 11
  },
  {
    id: 19,
    name: 'Pro Look 4',
    vendorCode: 'PL4CD',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Камера для любителей запечатлеть каждый момент жизни! Слот для SD-карты и возможность смотреть свои записи сразу на TV.',
    previewImg: 'img/content/pro-look-4.jpg',
    level: 'Любительский',
    rating: 5,
    price: 34590,
    previewImg2x: 'img/content/pro-look-4@2x.jpg',
    previewImgWebp: 'img/content/pro-look-4.webp',
    previewImgWebp2x: 'img/content/pro-look-4@2x.webp',
    reviewCount: 18
  },
  {
    id: 20,
    name: 'Pro Look 56F',
    vendorCode: 'PL67T56F',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: '6-кратный зум, чтобы выделить важные подробности. Простые настройки, ЖК-экран, лёгко помещается в руке - всегда можно брать с собой, Li-Ion аккамулятор.',
    previewImg: 'img/content/pro-look-56f.jpg',
    level: 'Любительский',
    rating: 3,
    price: 27990,
    previewImg2x: 'img/content/pro-look-56f@2x.jpg',
    previewImgWebp: 'img/content/pro-look-56f.webp',
    previewImgWebp2x: 'img/content/pro-look-56f@2x.webp',
    reviewCount: 9
  },
  {
    id: 21,
    name: 'Pro Look N',
    vendorCode: 'DRPLN5',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Камера для актвиных людей и для любителей снимать каждый момент своего путешествия в небе, пещерах, под водой, ночью и днём. Иновационный процессор, новейшая матрица CMOS, скорость сьёмки 200 кадр/сек',
    previewImg: 'img/content/pro-look-n.jpg',
    level: 'Профессиональный',
    rating: 4,
    price: 78290,
    previewImg2x: 'img/content/pro-look-n@2x.jpg',
    previewImgWebp: 'img/content/pro-look-n.webp',
    previewImgWebp2x: 'img/content/pro-look-n@2x.webp',
    reviewCount: 0
  },
  {
    id: 22,
    name: 'Pro Shot',
    vendorCode: 'PS78DR',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Экшн камера обладает ёмким аккумулятором, автоматической фокусировкой, цифровым стабилизатором изображения, сенсорный экран и голосовое управление. Погружение под воду до километра.',
    previewImg: 'img/content/pro-shot.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 75990,
    previewImg2x: 'img/content/pro-shot@2x.jpg',
    previewImgWebp: 'img/content/pro-shot.webp',
    previewImgWebp2x: 'img/content/pro-shot@2x.webp',
    reviewCount: 1
  },
  {
    id: 23,
    name: 'Go See',
    vendorCode: 'GS45E3',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Каждый момент вашей жизни останется в памяти: простое управление по силам даже ребёнку. Памяти сколько вы пожелаете - свободный слот под SD-карту. Легко подключить к компьютеру или сразу телевизору.',
    previewImg: 'img/content/go-see.jpg',
    level: 'Нулевой',
    rating: 5,
    price: 15990,
    previewImg2x: 'img/content/go-see@2x.jpg',
    previewImgWebp: 'img/content/go-see.webp',
    previewImgWebp2x: 'img/content/go-see@2x.webp',
    reviewCount: 17
  },
  {
    id: 24,
    name: 'Prof Lite 45',
    vendorCode: 'TG45Q',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Универсальный любительский фотоаппарат с функцией видеозаписи и ручных настроек для съёмки. Выездной объектив с 20-кратным зумом. Встроенная вспышка.',
    previewImg: 'img/content/prof-lite-45.jpg',
    level: 'Любительский',
    rating: 4,
    price: 49000,
    previewImg2x: 'img/content/prof-lite-45@2x.jpg',
    previewImgWebp: 'img/content/prof-lite-45.webp',
    previewImgWebp2x: 'img/content/prof-lite-45@2x.webp',
    reviewCount: 17
  },
  {
    id: 25,
    name: 'Prof Lite Q5',
    vendorCode: 'TG5Q5',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Продолжение линейки фотоаппаратов, которые помогут пройти вам путь от любителя к профессионалу. Помимо выездного зума, встроенной вспышки, ручных настроек, появляется жк-экран, улучшенный стабилизатор, и возможность подобрать по специальной цене объектива для макросъёмки. ',
    previewImg: 'img/content/prof-lite-q5.jpg',
    level: 'Любительский',
    rating: 3,
    price: 67990,
    previewImg2x: 'img/content/prof-lite-q5@2x.jpg',
    previewImgWebp: 'img/content/prof-lite-q5.webp',
    previewImgWebp2x: 'img/content/prof-lite-q5@2x.webp',
    reviewCount: 8
  },
  {
    id: 26,
    name: 'GQ Lite',
    vendorCode: 'GO89L',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Небольшая, лёгкая камера с функционалом для начинающего режиссёра. Многократный зум, отличная матрица, усовершенствованный стабилизатор, возможность съёмки по принципц го-про. Для данной камеры можно приобрести водоатталкивающий чехол. а в комплекте штатив. ',
    previewImg: 'img/content/gq-lite.jpg',
    level: 'Любительский',
    rating: 5,
    price: 71900,
    previewImg2x: 'img/content/gq-lite@2x.jpg',
    previewImgWebp: 'img/content/gq-lite.webp',
    previewImgWebp2x: 'img/content/gq-lite@2x.webp',
    reviewCount: 12
  },
  {
    id: 27,
    name: 'Life Pro',
    vendorCode: 'PH67F9R',
    type: 'Коллекционная',
    category: 'Фотоаппарат',
    description: 'Фотокамера премиум класса, позволяет зависывать видео в качестве 4К, обладет 53-кратным зумом, поворотный ЖК-экран, улучшенная матрица, мощный процессор. Линейка выпущена в ограниченном количестве, даже без дополнительного объектива позволит создавать великолепный фотографии за один миг.',
    previewImg: 'img/content/life-pro.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 199000,
    previewImg2x: 'img/content/life-pro@2x.jpg',
    previewImgWebp: 'img/content/life-pro.webp',
    previewImgWebp2x: 'img/content/life-pro@2x.webp',
    reviewCount: 0
  },
  {
    id: 28,
    name: 'Proksy',
    vendorCode: 'PF569K',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Фотокамера для старта. Даже ребёнок без труда освоит лёгкий в управлении аппарат. ЖК-экран поможет лёшко ориентироватьсяв настройках. Аппарат оснащён слотом для SD-карты',
    previewImg: 'img/content/proksy.jpg',
    level: 'Нулевой',
    rating: 3,
    price: 20990,
    previewImg2x: 'img/content/proksy@2x.jpg',
    previewImgWebp: 'img/content/proksy.webp',
    previewImgWebp2x: 'img/content/proksy@2x.webp',
    reviewCount: 17
  },
  {
    id: 29,
    name: 'Prof Go',
    vendorCode: 'PG90J',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Камера оснащена высокочувствительным сенсором, дополнена специальным пультом для возможности удалённой съёмки, возможностью съёмки в 4К-формате, высокоёмким аккамулятором и специальным чехлом для перевозки.',
    previewImg: 'img/content/prof-go.jpg',
    level: 'Профессиональный',
    rating: 2,
    price: 124590,
    previewImg2x: 'img/content/prof-go@2x.jpg',
    previewImgWebp: 'img/content/prof-go.webp',
    previewImgWebp2x: 'img/content/prof-go@2x.webp',
    reviewCount: 2
  },
  {
    id: 30,
    name: 'Prof Shot A5',
    vendorCode: 'JHF67',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: '14-мегапиксельный сенсор даёт все возможности для качественной съёмки. Двойной стабилизатор позволяет избежать смазанности. Удобный и прочный корпус, простые настройки и подвижный ЖК-дисплей. ',
    previewImg: 'img/content/prof-shot-a5.jpg',
    level: 'Профессиональный',
    rating: 4,
    price: 56000,
    previewImg2x: 'img/content/prof-shot-a5@2x.jpg',
    previewImgWebp: 'img/content/prof-shot-a5.webp',
    previewImgWebp2x: 'img/content/prof-shot-a5@2x.webp',
    reviewCount: 5
  },
  {
    id: 31,
    name: 'Glu D45',
    vendorCode: 'HF573E',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description: 'Системный фотоаппарат с иновационной начинкой. Удобный интерфейс, прекрасная выносливость, возможность съёмки в днемное и ночное время. Удобный интерфейс и специальное приложения для ваших фотографий.',
    previewImg: 'img/content/glu-d45.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 128990,
    previewImg2x: 'img/content/glu-d45@2x.jpg',
    previewImgWebp: 'img/content/glu-d45.webp',
    previewImgWebp2x: 'img/content/glu-d45@2x.webp',
    reviewCount: 9
  },
  {
    id: 32,
    name: 'Dru pro',
    vendorCode: 'DP89',
    type: 'Моментальная',
    category: 'Фотоаппарат',
    description: 'Одна кнопка отделет вас от запечатления самых ярких эмоций. ',
    previewImg: 'img/content/dru-pro.jpg',
    level: 'Нулевой',
    rating: 3,
    price: 1990,
    previewImg2x: 'img/content/dru-pro@2x.jpg',
    previewImgWebp: 'img/content/dru-pro.webp',
    previewImgWebp2x: 'img/content/dru-pro@2x.webp',
    reviewCount: 4
  },
  {
    id: 33,
    name: 'Amazing Go',
    vendorCode: 'AD345J',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Прикрепить камеру на шлем, сделать множество крутых видео под водой или записать свой полёт на тарзанке - благодаря усовершенствованной камере семейства Go ваши приключения останутся навсегда в памяти.',
    previewImg: 'img/content/amazing-go.jpg',
    level: 'Профессиональный',
    rating: 4,
    price: 79000,
    previewImg2x: 'img/content/amazing-go@2x.jpg',
    previewImgWebp: 'img/content/amazing-go.webp',
    previewImgWebp2x: 'img/content/amazing-go@2x.webp',
    reviewCount: 18
  },
  {
    id: 34,
    name: 'Prof Grey TG6',
    vendorCode: 'TG6PG45',
    type: 'Моментальная',
    category: 'Фотоаппарат',
    description: 'Настоящая фотолаборатория у вас в руках. Снимай-сохраняй-печатай. Принтер для печати в комплекте. А новейший процесс и светочувствительная матрица позволят сделать снимки феноменального качества и разрешения.',
    previewImg: 'img/content/prof-grey-tg6.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 156000,
    previewImg2x: 'img/content/prof-grey-tg6@2x.jpg',
    previewImgWebp: 'img/content/prof-grey-tg6.webp',
    previewImgWebp2x: 'img/content/prof-grey-tg6@2x.webp',
    reviewCount: 15
  },
  {
    id: 35,
    name: 'Click Pro',
    vendorCode: 'SSW01',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description: 'Подходит для дневной съёмки. Интуитивно понятный интерфейс, прочный металический корпус. Подходит для всех форматов плёнок.',
    previewImg: 'img/content/click-pro.jpg',
    level: 'Любительский',
    rating: 3,
    price: 7990,
    previewImg2x: 'img/content/click-pro@2x.jpg',
    previewImgWebp: 'img/content/click-pro.webp',
    previewImgWebp2x: 'img/content/click-pro@2x.webp',
    reviewCount: 9
  },
  {
    id: 36,
    name: 'Click Lite R',
    vendorCode: 'SSW45',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Небольшая цифровая камера для съёмок лучших моментов с 16-кратным зумом. Подходит как для ночной, так и для дневной съёмки',
    previewImg: 'img/content/click-lite-r.jpg',
    level: 'Любительский',
    rating: 4,
    price: 19990,
    previewImg2x: 'img/content/click-lite-r@2x.jpg',
    previewImgWebp: 'img/content/click-lite-r.webp',
    previewImgWebp2x: 'img/content/click-lite-r@2x.webp',
    reviewCount: 8
  },
  {
    id: 37,
    name: 'QI Go 56',
    vendorCode: 'QI56HGF',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Среднеформатная, компактная модель с возможностью записи видео, мгновенной передачи данных через порт Bluetooth. Возможность ручных настроек и встроенный стабилизатор изображения позволят использовать камеру для создания репортажных фотографий.',
    previewImg: 'img/content/qi-go-56.jpg',
    level: 'Любительский',
    rating: 2,
    price: 39990,
    previewImg2x: 'img/content/qi-go-56@2x.jpg',
    previewImgWebp: 'img/content/qi-go-56.webp',
    previewImgWebp2x: 'img/content/qi-go-56@2x.webp',
    reviewCount: 1
  },
  {
    id: 38,
    name: '2000 Go',
    vendorCode: '2000GH',
    type: 'Моментальная',
    category: 'Фотоаппарат',
    description: 'Фотоаппарат для моментальной съёмки со сменными картриджами. Первые 2 упаковки идут в подарок с камерой. Яркий дизайн, лёгкий и крепкий корпус.',
    previewImg: 'img/content/2000-go.jpg',
    level: 'Любительский',
    rating: 1,
    price: 10990,
    previewImg2x: 'img/content/2000-go@2x.jpg',
    previewImgWebp: 'img/content/2000-go.webp',
    previewImgWebp2x: 'img/content/2000-go@2x.webp',
    reviewCount: 11
  },
  {
    id: 39,
    name: 'Prof g',
    vendorCode: 'PRC56H',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Гибридная система сталибилизации, 12-кратный зум, естественная передача цветов. Ёмкостный аккамулятор - более 30 часов съёмки без подзарядки.',
    previewImg: 'img/content/prof-g.jpg',
    level: 'Любительский',
    rating: 2,
    price: 17990,
    previewImg2x: 'img/content/prof-g@2x.jpg',
    previewImgWebp: 'img/content/prof-g.webp',
    previewImgWebp2x: 'img/content/prof-g@2x.webp',
    reviewCount: 16
  },
  {
    id: 40,
    name: 'Prof Lite Zero',
    vendorCode: 'PL34ZO',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: '20-кратный зум, подвижный ЖК-экран с поворотом на 360 градусов, встроенная стабилизация, удобная посадка в руки - лучший вариант для старта.',
    previewImg: 'img/content/prof-lite-zero.jpg',
    level: 'Нулевой',
    rating: 3,
    price: 35000,
    previewImg2x: 'img/content/prof-lite-zero@2x.jpg',
    previewImgWebp: 'img/content/prof-lite-zero.webp',
    previewImgWebp2x: 'img/content/prof-lite-zero@2x.webp',
    reviewCount: 3
  }
];

function Catalog() {

  const currentPage = useAppSelector(getCurrentPage);
  const lastProductIndex = currentPage * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;
  const currentProducts = cameras.slice(firstProductIndex, lastProductIndex);


  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от" />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="priceUp"
                                placeholder="до"
                              />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="photocamera"
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Фотокамера
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Видеокамера
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="digital"
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Плёночная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Моментальная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="collection"
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Коллекционная
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Любительский
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Профессиональный
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <button
                        className="btn catalog-filter__reset-btn"
                        type="reset"
                      >
                    Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input
                              type="radio"
                              id="sortPrice"
                              name="sort"
                              defaultChecked
                            />
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort" />
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input
                              type="radio"
                              id="up"
                              name="sort-icon"
                              defaultChecked
                              aria-label="По возрастанию"
                            />
                            <label htmlFor="up">
                              <svg width={16} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-sort" />
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input
                              type="radio"
                              id="down"
                              name="sort-icon"
                              aria-label="По убыванию"
                            />
                            <label htmlFor="down">
                              <svg width={16} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-sort" />
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="cards catalog__cards">
                    {currentProducts.map((it) => <ProductCard data={it} key={it.id}/>)}
                  </div>
                  <Pagination data={cameras}/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
