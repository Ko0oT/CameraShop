import React from 'react';
import { Review as ReviewType } from '../../types/types';
import StarsRating from './../stars-rating/stars-rating';

type ReviewProps = {
  data: ReviewType;
}

function Review({data}: ReviewProps) {
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{data.userName}</p>
        <time className="review-card__data" dateTime={data.createAt}>
          {new Date(data.createAt).toLocaleString('ru', {day: 'numeric', month: 'long'})}
        </time>
      </div>
      <div className="rate review-card__rate">
        <StarsRating rating={data.rating}/>
        <p className="visually-hidden">Оценка: {data.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {data.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {data.disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {data.review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default Review;
