export interface Author {
  id: number;
  full_name: string;
  birth_date: string;
  bio_wikipediya: string;
  created_at: string;
  picture_url: string;
  country_id: number;
  country: Country;
}

export interface Country {
  id: number;
  name: string;
  count: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  is_institute_literature: boolean;
  created_at: string;
  books: any[]; // Agar "books" obyekti bo'sh bo'lsa, any[] sifatida qoldiramiz.
}

export interface Book {
  id: number;
  name: string;
  type: string;
  year: number;
  description: string;
  length: number;
  created_at: string;
  updated_at: string;
  picture_url: string;
  pdf_url: string;
  count: number;
  author_id: number;
  country_id: number;
  category_id: number;
  author: Author;
  country: Country;
  category: Category;
  book_users: any[]; // Foydalanuvchilar sharhlari yoki boshqa ma'lumotlar bo'lishi mumkin.
  lazy_loader: any; // Ma'lumotsiz kelgan qismi, ehtimol API optimizatsiyasi uchun.
}
