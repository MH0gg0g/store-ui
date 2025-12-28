export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UpdateEmail {
  email: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}