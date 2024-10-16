import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { UserInterface } from 'src/app/models/user-interface';
import { CommonStorageService } from '../common-storage/common-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userName: Subject<any> = new Subject<any>();
  public isUserActive = false;
  public userName = this._userName.asObservable();
  constructor(private commonStorageService: CommonStorageService, private httpClient: HttpClient) { }
  userRegistration(user: UserInterface): Observable<any> {
    return this.httpClient.post(this.commonStorageService.baseUrl + '/api/user-registration', user);
  }
  setActiveUserName(userName: string): void {
    this._userName.next(userName);
    if(userName){
      this.isUserActive = true;
    }else{
      this.isUserActive = false;
    }
  }
}
