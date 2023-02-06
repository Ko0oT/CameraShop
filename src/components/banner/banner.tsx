import React from 'react';
// import { Link } from 'react-router-dom';
// import { AppRoute } from '../../constants';

const data = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  previewImg: 'img/content/promo.jpg',
  previewImg2x: 'img/content/promo@2x.jpg',
  previewImgWebp: 'img/content/promo.webp',
  previewImgWebp2x: 'img/content/promo@2x.webp'
};

function Banner() {
  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          // srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
          srcSet={`${data.previewImgWebp}, ${data.previewImgWebp2x} 2x`}
        />
        <img
          // src="img/content/banner-bg.jpg"
          src={`${data.previewImg}`}
          // srcSet="img/content/banner-bg@2x.jpg 2x"
          srcSet={`${data.previewImg2x} 2x`}
          width={1280}
          height={280}
          alt={data.name}
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {data.name}
        </span>
        <span className="banner__text">
    Профессиональная камера от&nbsp;известного производителя
        </span>
        {/* <Link className="btn" to={`${AppRoute.Cameras}/${data.id}`}>
    Подробнее
        </Link> */}
      </p>
    </div>
  );
}

export default Banner;
