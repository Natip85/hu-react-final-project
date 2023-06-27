export interface Card {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: string;
  imageUrl?: string;
  imageAlt?: string;
  state?: string;
  country?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  cardNumber?: number;
  userId?: string
  createdAt?: string;
  updatedAt?: string;
  error?: string
  details?: string
  message?: string
   lat?: number 
  lng?: number 
  favorite?: Boolean 
  favoriteCards?: any
  status?: boolean
}


export enum SelectedPage {
  About = "about",
  
}