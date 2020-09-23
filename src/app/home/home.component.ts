import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@app/_models';
import { Element } from '@app/_models/Element';
import { AccountService, AuctionService } from '@app/_services';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit{

  loggedUser: User;
  interval: any;
  displayedColumns: string[] = ['username','imageUrl', 'transmissionType', 'fuel', 'remainingTime', 'Bid'];
  dataSource: MatTableDataSource<UserData>;
  users: any[];
  showModal: boolean;
  selectedImage: any;
  maxBidValue: any;
  data: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 
    constructor(
      private accountService: AccountService,
      private auctionService: AuctionService,      
      ) {
        this.loggedUser = this.accountService.userValue;
         this.users =[
        {"username":"Anita","VehicleName":"Tesla","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "8993339", "Bid": "570.59"},
        {"username":"Anita123","VehicleName":"Fiat","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "899933", "Bid": "508.89"},
        {"username":"Anita123","VehicleName":"Hyundai","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "1956","Bid": "500.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"mercedes","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "2000", "Bid": "5022.89"},
        {"username":"Anita123","VehicleName":"Audi","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "10", "Bid": "564.89"},
        {"username":"Anita123","VehicleName":"Audi","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "Auto","fuel":"Petrol", "remainingTime": "6000", "Bid": "502.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Ferrari","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "6254", "Bid": "502.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Tesla","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "7859", "Bid": "562.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"SmartCar","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "4789", "Bid": "402.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Suzuki","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "4569", "Bid": "400.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Porsche","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "1758", "Bid": "508.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Fiat","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "Auto","fuel":"Petrol", "remainingTime": "454545", "Bid": "570.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Audi","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "2323", "Bid": "564.89"},
        {"username":"dealership@alwaysAvailable.com","VehicleName":"Audi","imageUrl": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1585643431/rnw94zmxknvgcboluqyn.jpg","transmissionType": "ez","fuel":"Petrol", "remainingTime": "35", "Bid": "564.89"},

      
        ]
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.users);
    }

    ngOnInit() {
      console.log ()
      console.log(this.hideRow(5));
        // this.auctionService.getDummyAuction().subscribe(data => {
        // });
       
      // this.interval = setInterval(() => { 
      //     this.loadAuction(); 
      // }, 20000);
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.maxBidValue = Math.max(...this.users.map(o => o.Bid), 0)
    }

    buyerMaxBid(bidValue,user){
      return (bidValue >= this.maxBidValue && this.loggedUser.username == user) ? true : false;
    }

    hideRow(setTime){
      setTimeout( function() {
        return true  }, setTime*1000 );
    }  
    
    showImage(rowData){
      this.selectedImage = rowData.imageUrl
      this.showModal = true;
    }
    hide(){
      this.showModal = false;
    }
  
    loadAuction(){
      this.auctionService.getAuction().subscribe(data => {
      })
    }
    ngOnDestroy() {
      clearInterval(this.interval);
    }


}
