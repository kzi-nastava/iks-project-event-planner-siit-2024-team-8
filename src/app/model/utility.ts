import { Asset } from './asset';

export interface Utility extends Asset {
  duration: number;           // Duration in minutes
  reservationTerm: number;    // Reservation term in days
  cancellationTerm: number;   // Cancellation term in days
  manuelConfirmation: boolean;
}
