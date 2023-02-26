import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Review, ReviewPost } from '../../types/types';

type ReviewFormProps = {
  handleReviewsChange: (newReview: Review) => void;
};

function ReviewForm({handleReviewsChange}: ReviewFormProps) {

  const { id } = useParams();

  const initialFormState: ReviewPost = {
    cameraId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    if (name === 'rating') {
      setFormData({
        ...formData,
        rating: Number(value),
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsFormDisabled(true);
    // api.post<Review>(`${APIRoute.Review}`, formData).then((response) => handleReviewsChange(response.data))
    //   .then(() => setFormData(initialFormState))
    //   .finally(() => setIsFormDisabled(false));

    // Временно
    handleReviewsChange(formData as Review);
  };

  const isRatingInvalid = formData.rating === 0;
  const isUserNameInvalid = formData.userName.length === 0;
  const isAdvantageInvalid = formData.advantage.length === 0;
  const isDisadvantageInvalid = formData.disadvantage.length === 0;
  const isReviewInvalid = formData.review.length < 5;

  return (
    <div className="form-review">
      <form
        method="post"
        onSubmit={handleFormSubmmit}
      >
        <div className="form-review__rate">
          <fieldset className={`rate form-review__item ${isRatingInvalid ? 'is-invalid' : ''}`}>
            <legend className="rate__caption">
            Рейтинг
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                <input
                  className="visually-hidden"
                  id="star-5"
                  name="rating"
                  type="radio"
                  defaultValue={5}
                  checked={Number(formData.rating) === 5}
                  onChange={handleFieldChange}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-5"
                  title="Отлично"
                />
                <input
                  className="visually-hidden"
                  id="star-4"
                  name="rating"
                  type="radio"
                  defaultValue={4}
                  checked={Number(formData.rating) === 4}
                  onChange={handleFieldChange}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-4"
                  title="Хорошо"
                />
                <input
                  className="visually-hidden"
                  id="star-3"
                  name="rating"
                  type="radio"
                  defaultValue={3}
                  checked={Number(formData.rating) === 3}
                  onChange={handleFieldChange}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-3"
                  title="Нормально"
                />
                <input
                  className="visually-hidden"
                  id="star-2"
                  name="rating"
                  type="radio"
                  defaultValue={2}
                  checked={Number(formData.rating) === 2}
                  onChange={handleFieldChange}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-2"
                  title="Плохо"
                />
                <input
                  className="visually-hidden"
                  id="star-1"
                  name="rating"
                  type="radio"
                  defaultValue={1}
                  checked={Number(formData.rating) === 1}
                  onChange={handleFieldChange}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-1"
                  title="Ужасно"
                />
              </div>
              <div className="rate__progress">
                <span className="rate__stars">{formData.rating}</span> <span>/</span>{' '}
                <span className="rate__all-stars">5</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          <div className={`custom-input form-review__item ${isUserNameInvalid ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
            Ваше имя
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                name="userName"
                placeholder="Введите ваше имя"
                required
                onChange={handleFieldChange}
                value={formData.userName}
                disabled={isFormDisabled}
              />
            </label>
            <p className="custom-input__error">Нужно указать имя</p>
          </div>
          <div className={`custom-input form-review__item ${isAdvantageInvalid ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
            Достоинства
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                name="advantage"
                placeholder="Основные преимущества товара"
                required
                onChange={handleFieldChange}
                value={formData.advantage}
                disabled={isFormDisabled}
              />
            </label>
            <p className="custom-input__error">Нужно указать достоинства</p>
          </div>
          <div className={`custom-input form-review__item ${isDisadvantageInvalid ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
            Недостатки
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                name="disadvantage"
                placeholder="Главные недостатки товара"
                required
                onChange={handleFieldChange}
                value={formData.disadvantage}
                disabled={isFormDisabled}
              />
            </label>
            <p className="custom-input__error">Нужно указать недостатки</p>
          </div>
          <div className={`custom-textarea form-review__item ${isReviewInvalid ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-textarea__label">
              Комментарий
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <textarea
                name="review"
                minLength={5}
                placeholder="Поделитесь своим опытом покупки"
                onChange={handleFieldChange}
                value={formData.review}
                disabled={isFormDisabled}
              />
            </label>
            <div className="custom-textarea__error">
            Нужно добавить комментарий
            </div>
          </div>
        </div>
        <button
          className="btn btn--purple form-review__btn"
          type="submit"
          disabled={isRatingInvalid || isUserNameInvalid || isAdvantageInvalid || isDisadvantageInvalid || isReviewInvalid || isFormDisabled}
        >
          {isFormDisabled ? 'Отправляю...' : 'Отправить отзыв'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
