import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProviderService{

  providerApi ="/providers"

  constructor(private http: HttpClient) { }


  registerProvider(formData : FormData) : Observable<Object> {
    return this.http.post(environment.apiHost+this.providerApi+"/register",formData);
  }


}
