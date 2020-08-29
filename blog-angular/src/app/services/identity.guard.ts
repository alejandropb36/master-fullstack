import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable()

export class IdentityGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router

    ) { }

    canActivate(): boolean {
        const identity = this.userService.gteIdentity();

        if (identity) {
            return true;
        } else {
            this.router.navigate(['/inicio']);
            return false;
        }
    }
}
