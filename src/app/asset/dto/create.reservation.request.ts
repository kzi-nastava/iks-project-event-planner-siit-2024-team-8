export interface CreateReservationRequest {
  date: string;
  time: string;
  utilityId: string;
  eventId: string;
}
export function returnCreateReservationRequest() : CreateReservationRequest{
  return{
    date : null,
    time : "",
    utilityId : "",
    eventId : "",
  }
}
