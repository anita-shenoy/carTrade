import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private SERVER_URL = "https://caronsale-backend-service-dev.herokuapp.com/api/v1";

  constructor(private httpClient: HttpClient) { }

  public getAuction(){  
    return this.httpClient.get(`${this.SERVER_URL}/v2/auction/buyer/`);  
  }  

  public getDummyAuction() : Observable<any> {
    return this.httpClient.get("../data/auction.json"); 
}
}