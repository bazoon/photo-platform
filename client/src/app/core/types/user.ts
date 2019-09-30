export interface User {
  id: number,
  firstName: string,
  lastName: string,
  nickName: string,
  avatar: string,
  email: string,
  phone: string,
  userType: number,
  emailState: number,
  emailCode: string,
  biography: string,
  awards: string,
  createdAt: Date,
  rowState: number
};

export const emptyUser: User = {
  id: -1,
  firstName: "",
  lastName: "",
  nickName: "",
  avatar: "",
  email: "",
  phone: "",
  userType: -1,
  emailState: -1,
  emailCode: "",
  biography: "",
  awards: "",
  createdAt: new Date(),
  rowState: -1,
};
