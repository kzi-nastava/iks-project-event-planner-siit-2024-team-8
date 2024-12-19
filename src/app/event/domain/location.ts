export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  street: string;
}
export function returnLocation(){
  return {
    latitude: 0,
    longitude: 0,
    city: '',
    street: '',
  }
}
