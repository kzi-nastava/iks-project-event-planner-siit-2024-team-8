export interface Invitation{
  index: number;
  email:string;
  isInput:boolean;
}
export function returnInvitation(id: number) {
  return {
    index : id,
    email: "",
    isInput: true,
  }
}
