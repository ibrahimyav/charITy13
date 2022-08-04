import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametersProvider } from '../parameters/parameters';
import { GlobalFunctionsProvider } from '../global-functions/global-functions';

@Injectable()
export class EventDateAttendeesProvider {

  url: string;

  constructor(public http: HttpClient, public parameters: ParametersProvider, public globalFunctions: GlobalFunctionsProvider) { }

  getAttendees(eventDateReference) {
    this.url = this.parameters.getWebsiteRootUrl() + '/' + this.globalFunctions.getCurrentLang() + '/' + this.parameters.getEventDateAttendeesUrl();
    
    this.url = this.url.replace("{eventDateReference}", eventDateReference);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': this.globalFunctions.getApiKey(),
     
    });

    return this.http.get(this.url, {headers});
  }

}
