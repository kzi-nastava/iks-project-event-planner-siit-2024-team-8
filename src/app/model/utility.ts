import { Asset } from './asset';

export interface Utility extends Asset {
  duration: number;           // Duration in minutes
  reservationTerm: string;    // Reservation term in days
  cancellationTerm: string;   // Cancellation term in days
  manuelConfirmation: boolean;
}
