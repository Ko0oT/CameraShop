import { CameraCategory, CameraLevel, CameraType } from '../constants';

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type Product = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  previewImg: string;
  level: string;
  rating: number;
  price: number;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type Review = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
};

export type ReviewPost = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type FormUncontrollableInput = Omit<ReviewPost, 'cameraId' | 'rating'>;

export type FormControllableInput = Pick<ReviewPost, 'cameraId' | 'rating'>;

export type Filter = {
  category: CameraCategory[];
  type: CameraType[];
  level: CameraLevel[];
}

export type Price = {
  minPrice: number | string;
  maxPrice: number | string;
}
