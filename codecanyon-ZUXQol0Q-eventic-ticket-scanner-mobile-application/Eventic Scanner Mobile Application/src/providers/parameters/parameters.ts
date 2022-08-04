import { Injectable } from '@angular/core';

/*
  Generated class for the ParametersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParametersProvider {

    languages: { [key: string]: string };
    website_root_url: string;
    login_url: string;
    event_date_attendees_url: string;
    grant_access_url: string;

    constructor() {
        this.languages = {
            "en": "English",
            "fr": "Français",
            "ar": "عربي"
        }
        this.website_root_url = "https://eventic.mtrsolution.com";
        this.login_url = "api/login";
        this.event_date_attendees_url = "api/scanner/get-event-date-attendees/{eventDateReference}";
        this.grant_access_url = "api/scanner/event-date/{eventDateReference}/grant-access/{ticketReference}";
    }

    getLanguages() {
        return this.languages;
    }

    getWebsiteRootUrl() {
        return this.website_root_url;
    }

    getLoginUrl() {
        return this.login_url;
    }

    getEventDateAttendeesUrl() {
        return this.event_date_attendees_url;
    }

    getGrantAccessUrl() {
        return this.grant_access_url;
    }

}
