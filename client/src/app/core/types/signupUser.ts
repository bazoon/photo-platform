export interface SignupUser {
  [key: string]: any,
  id: number,
  firstName: string,
  lastName: string,
  nickName: string,
  avatar: File,
  email: string,
  phone: string,
  password: string,
};