import React, { useMemo, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { FormControllableInput, FormUncontrollableInput, Review as ReviewType } from '../../types/types';
import { useForm } from 'react-hook-form';
import { createAPI } from '../../services/api';
import { APIRoute, MAX_STARS_RATING, Rating, REVIEW_COMMENT_MIN_LENGTH, USEFORM_MODE } from '../../constants';

type ReviewFormProps = {
  handleReviewsChange: (newReview: ReviewType) => void;
};

function ReviewForm({handleReviewsChange}: ReviewFormProps) {

  const { id } = useParams();
  const api = useMemo(() => createAPI(), []);

  const initialFormState: FormControllableInput = {
    cameraId: Number(id),
    rating: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const isRatingInputInvalid = formData.rating === 0;

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const {
    register,
    formState: {
      errors, isValid,
    },
    handleSubmit,
  } = useForm<FormUncontrollableInput>({
    mode: USEFORM_MODE
  });


  const onSubmit = async (data: FormUncontrollableInput) => {
    setIsFormDisabled(true);
    try {
      const response = await api.post<ReviewType>(`${APIRoute.Reviews}`, {...data, ...formData});
      handleReviewsChange(response.data);
    } finally {
      setIsFormDisabled(false);
    }
  };

  const makeStar = (it: number) => (
    <React.Fragment key={it}>
      <input
        checked={Number(formData.rating) === it}
        onChange={handleFieldChange}
        name={'rating'}
        required
        className="visually-hidden"
        id={`star-${it}`}
        type="radio"
        defaultValue={it}
        disabled={isFormDisabled}
        data-testid="star"
      />
      <label
        className="rate__label"
        htmlFor={`star-${it}`}
        title={Rating[it - 1]}
      />
    </React.Fragment>);

  return (
    <div className="form-review">
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-review__rate">
          <fieldset className={`rate form-review__item ${isRatingInputInvalid ? 'is-invalid' : ''}`}>
            <legend className="rate__caption">
            Рейтинг
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                {[5, 4, 3, 2, 1].map((it) => makeStar(it))}
              </div>
              <div className="rate__progress">
                <span className="rate__stars">{formData.rating}</span> <span>/</span>{' '}
                <span className="rate__all-stars">{MAX_STARS_RATING}</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          <div className={`custom-input form-review__item ${errors?.userName ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
            Ваше имя
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                {...register('userName', {
                  required: 'Поле обязателько к заполнению'
                })}
                type="text"
                placeholder="Введите ваше имя"
                disabled={isFormDisabled}
                data-testid="userName"
              />
            </label>
            <p className="custom-input__error">Нужно указать имя</p>
          </div>
          <div className={`custom-input form-review__item ${errors?.advantage ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
            Достоинства
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                {...register('advantage', {
                  required: 'Поле обязателько к заполнению'
                })}
                type="text"
                placeholder="Основные преимущества товара"
                disabled={isFormDisabled}
                data-testid="advantage"
              />
            </label>
            <p className="custom-input__error">Нужно указать достоинства</p>
          </div>
          <div className={`custom-input form-review__item ${errors?.disadvantage ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
            Недостатки
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                {...register('disadvantage', {
                  required: 'Поле обязателько к заполнению'
                })}
                type="text"
                placeholder="Главные недостатки товара"
                disabled={isFormDisabled}
                data-testid="disadvantage"
              />
            </label>
            <p className="custom-input__error">Нужно указать недостатки</p>
          </div>
          <div className={`custom-textarea form-review__item ${errors?.review ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-textarea__label">
              Комментарий
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <textarea
                {...register('review', {
                  required: 'Нужно добавить комментарий',
                  minLength: {
                    value: REVIEW_COMMENT_MIN_LENGTH,
                    message: `Минимум ${REVIEW_COMMENT_MIN_LENGTH} символов`
                  },
                })}
                placeholder="Поделитесь своим опытом покупки"
                disabled={isFormDisabled}
                data-testid="review"
              />
            </label>
            <div className="custom-textarea__error">
              {errors?.review?.message}
            </div>
          </div>
        </div>
        <button
          className="btn btn--purple form-review__btn"
          type="submit"
          disabled={isFormDisabled || !isValid || isRatingInputInvalid}
          data-testid="submit"
        >
          {isFormDisabled ? 'Отправляю...' : 'Отправить отзыв'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
