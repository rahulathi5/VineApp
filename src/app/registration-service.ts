import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

declare var localStorage: any;

export interface UserObject {
    name: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    logintype:Number;
}

@Injectable()
export class UserRegistrationService {
    user: any;
    session: any;

    constructor( private router: Router) {
        this.checkStorage();
    }

    checkStorage() {
        if (localStorage.getItem('vineRegistrationData')!='undefined') {
            this.user = JSON.parse(localStorage.getItem('vineRegistrationData'));
        } else {
            this.user = null;
        }
    }

    setUser(user: any) {
        this.user = user;
        localStorage.setItem('vineRegistrationData', JSON.stringify(this.user));
    }

    getUser(): any {
        return this.user;
    }

}
