import { Product, Promo, Review } from '../types/types';
import { datatype, random, commerce, system, internet } from 'faker';

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: random.words(2),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakeCamera = (): Product => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: random.alphaNumeric(10),
  type: commerce.product(),
  category: commerce.product(),
  description: commerce.productDescription(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  level: random.words(1),
  rating: datatype.number({min: 1, max: 5}),
  price: datatype.number(),
  reviewCount: datatype.number(),
} as Product);

export const makeFakeCameras = (): Product[] => new Array(30).fill(null).map(() => makeFakeCamera());

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

export const makeFakeReviews = (): Review[] => new Array(10).fill(null).map(() => makeFakeReview());

