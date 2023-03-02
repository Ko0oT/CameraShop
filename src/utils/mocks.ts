import { Product, Promo, Review } from '../types/types';
import { datatype, random, commerce, internet } from 'faker';

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: random.words(2),
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
});

export const makeFakeCamera = (): Product => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: random.alphaNumeric(10),
  type: commerce.product(),
  category: commerce.product(),
  description: commerce.productDescription(),
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  level: random.words(1),
  rating: datatype.number({min: 1, max: 5}),
  price: datatype.number(),
  reviewCount: datatype.number(),
} as Product);

export const makeFakeCameras = (count: number): Product[] => new Array(count).fill(null).map(() => makeFakeCamera());

export const makeFakeReview = (): Review => ({
  id: String(datatype.number()),
  userName: internet.userName(),
  advantage: random.words(5),
  disadvantage: random.words(5),
  review: commerce.productDescription(),
  rating: datatype.number({min: 1, max: 5}),
  createAt: String(datatype.datetime()),
  cameraId: datatype.number(),
});

export const makeFakeReviews = (count: number): Review[] => new Array(count).fill(null).map(() => makeFakeReview());

