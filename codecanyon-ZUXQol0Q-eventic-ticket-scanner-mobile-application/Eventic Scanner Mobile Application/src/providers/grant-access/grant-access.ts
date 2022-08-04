import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametersProvider } from '../parameters/parameters';
import { GlobalFunctionsProvider } from '../global-functions/global-functions';

@Injectable()
export class GrantAccessProvider {

  url: string;

  constructor(public http: HttpClient, public parameters: ParametersProvider, public globalFunctions: GlobalFunctionsProvider) { }

  scanTicket(eventDateReference, ticketReference) {
    this.url = this.parameters.getWebsiteRootUrl() + '/' + this.globalFunctions.getCurrentLang() + '/' + this.parameters.getGrantAccessUrl();
    
    this.url = this.url.replace("{eventDateReference}", eventDateReference);
    this.url = this.url.replace("{ticketReference}", ticketReference);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': this.globalFunctions.getApiKey(),
     
    });

    return this.http.get(this.url, {headers});
  }

}
