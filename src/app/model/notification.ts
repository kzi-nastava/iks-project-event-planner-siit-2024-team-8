export interface Notification {
  id: string;
  title: string;
  body: string;
  seen: boolean;
  clickable: boolean;
  reservationId: string | null;
  timestamp: string;
}
