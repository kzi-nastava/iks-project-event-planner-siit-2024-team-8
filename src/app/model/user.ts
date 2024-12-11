export enum UserType {
  USER = 'USER',
  ORGANIZER = 'ORGANIZER',
  PROVIDER = 'PROVIDER'
}

export interface User {
  id: number;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  number: string;
  address: string;
  userType: UserType;
  companyName: string;
  companyDescription: string;
  companyImagesURL: string[];

  isActive: boolean;
}

export function returnUser(firstName: string, lastName: string, email: string, password: string, number: string, address: string, userType: UserType): User {
  return {
    id: -1, //generated in backend

    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    number: number,
    address: address,
    userType: userType,

    companyName: "",
    companyDescription: "",
    companyImagesURL: [],
    isActive: false
  }
}
