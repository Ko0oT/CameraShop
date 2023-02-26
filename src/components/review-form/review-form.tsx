import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormUncontrollableInput, Review } from '../../types/types';
import { useForm } from 'react-hook-form';

type ReviewFormProps = {
  handleReviewsChange: (newReview: Review) => void;
};

function ReviewForm({handleReviewsChange}: ReviewFormProps) {

  const { id } = useParams();

  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const {
    register,
    watch,
    formState: {
      errors, isValid,
    },
    handleSubmit,
  } = useForm<FormUncontrollableInput>({
    mode: 'all'
  });

  const watchRating = watch('rating');

  const onSubmit = (data: FormUncontrollableInput) => {
    setIsFormDisabled(true);
    // api.post<Review>(`${APIRoute.Review}`, formData).then((response) => handleReviewsChange(response.data))
    //   .then(() => setFormData(initialFormState))
    //   .finally(() => setIsFormDisabled(false));

    // api.post<BookedQuest>(`${APIRoute.Quests}/${id as string}/booking`, {...data, cameraId: Number(id)})
    // .then(() => navigate(AppRoute.MyQuests))
    // .finally(() => setIsSendingData(false));

    handleReviewsChange(data as Review);
  };

  return (
    <div className="form-review">
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-review__rate">
          <fieldset className={`rate form-review__item ${errors?.rating ? 'is-invalid' : ''}`}>
            <legend className="rate__caption">
            Рейтинг
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                <input
                  {...register('rating', {
                    required: true,
                  })}
                  className="visually-hidden"
                  id="star-5"
                  type="radio"
                  value={5}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-5"
                  title="Отлично"
                />
                <input
                  {...register('rating', {
                    required: true,
                  })}
                  className="visually-hidden"
                  id="star-4"
                  type="radio"
                  value={4}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-4"
                  title="Хорошо"
                />
                <input
                  {...register('rating', {
                    required: true,
                  })}
                  className="visually-hidden"
                  id="star-3"
                  type="radio"
                  value={3}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-3"
                  title="Нормально"
                />
                <input
                  {...register('rating', {
                    required: true,
                  })}
                  className="visually-hidden"
                  id="star-2"
                  type="radio"
                  value={2}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-2"
                  title="Плохо"
                />
                <input
                  {...register('rating', {
                    required: true,
                  })}
                  className="visually-hidden"
                  id="star-1"
                  type="radio"
                  value={1}
                  disabled={isFormDisabled}
                />
                <label
                  className="rate__label"
                  htmlFor="star-1"
                  title="Ужасно"
                />
              </div>
              <div className="rate__progress">
                <span className="rate__stars">{watchRating ? watchRating : 0}</span> <span>/</span>{' '}
                <span className="rate__all-stars">5</span>
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
                    value: 5,
                    message: 'Минимум 5 символов'
                  },
                })}
                placeholder="Поделитесь своим опытом покупки"
                disabled={isFormDisabled}
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
          disabled={isFormDisabled || !isValid}
        >
          {isFormDisabled ? 'Отправляю...' : 'Отправить отзыв'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
