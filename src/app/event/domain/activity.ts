import {Time} from '@angular/common';
import {Timestamp} from 'rxjs';

export interface Activity {
  startTime: string;

  endTime: string;

  description: string;

  name: string;

  place: string;

  isInput: boolean;

  index: number;

}
export function returnActivity(index: number): Activity{
  return{
    name : "",
    description : "",
    isInput: true,
    endTime : "",
    startTime: "",
    place: "",
    index : index
  };
}

