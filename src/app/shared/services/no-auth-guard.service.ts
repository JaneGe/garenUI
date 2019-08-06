import {Injectable} from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {JwtService} from "./jwt.service";


@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router,
              private jwtService: JwtService) {
  }

  canActivate(): boolean {

    const token = this.jwtService.getToken();

    if (token && token.length > 0) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
