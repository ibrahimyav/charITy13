import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametersProvider } from '../parameters/parameters';
import { GlobalFunctionsProvider } from '../global-functions/global-functions';

@Injectable()
export class LoginProvider {

  url: string;

  constructor(public http: HttpClient, public parameters: ParametersProvider, public globalFunctions: GlobalFunctionsProvider) { }

  authenticate(username, password) {
    this.url = this.parameters.getWebsiteRootUrl() + '/' + this.globalFunctions.getCurrentLang() + '/' + this.parameters.getLoginUrl();
    
    return this.http.get(this.url + "?username=" + username + "&password=" + password);
  }

}