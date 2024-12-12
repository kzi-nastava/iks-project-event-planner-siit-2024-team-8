export interface UserUpdateResponse {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  address: string;
  companyName: string;
  companyDescription: string;
  companyImagesURL: string[];
}
export function returnUpdatedUser(firstName: string, lastName: string, email: string, number: string, address: string, companyName: string, companyDescription: string, companyImagesURL: string[]) {
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    number: number,
    address: address,
    companyName: companyName,
    companyDescription: companyDescription,
    companyImagesURL: companyImagesURL,
  }
}
