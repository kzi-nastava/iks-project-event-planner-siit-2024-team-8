export interface Invitation{
  id: number;
  email:string;
  isInput:boolean;
}
export function returnInvitation(id: number) {
  return {
    id : id,
    email: "",
    isInput: true,
  }
}
