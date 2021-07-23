import { ServerUrl } from './../../core/constant/serverurl.constant';
import { Dataservice } from './../../service/data.service';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-vastu-score-tool',
  templateUrl: './vastu-score-tool.component.html',
  styleUrls: ['./vastu-score-tool.component.css'],
})
export class VastuScoreToolComponent implements OnInit {
  // @INPUT  is used for get data from parent component

  @Input()
  data!: any[];
  responseData: any;
 private canGoBack!: boolean;
  getLegendInfo:boolean=false;
  display = 'none';

  roomWiseVastuScore: any;
  overallVastuScore: any;
  vastuScoreStatus: any;
  getRoomDetailsList:any;
  favourableDirections: any;
  neutralDirections: any;
  unfavourableDirections: any;
  aboutDescription: any;
  favourableDirectionsList: any;
  ListDataName: any;
  RoomeName: any;
  constructor(
    private dataService:Dataservice,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
   ) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
   }

  ngOnInit(): void {


    this.getdataFromInput();
  }
  //method for back arrow
  // backClicked() {
  //   console.log("back clicked")
  //   this._location.back();
  //   // this.router.navigate(['/vastuScore'])
  // }
  backClicked(): void {
    // debugger
    console.log("back clicked")
    {
      this.location.back();
      // There's no previous navigation.
      // Here we decide where to go. For example, let's say the
      // upper level is the index page, so we go up one level.
      // this.router.navigate(['../vastuScore'], {relativeTo: this.route});
    }}
   //for open modal page
   openModal() {
    this.display = 'block';
  }
  //for close modal page
  onCloseHandled() {
    this.display = 'none';
  }
  //method for store data in variable
  getdataFromInput() {

    this.responseData = this.data;
    console.log(this.responseData);
    this.roomWiseVastuScore =
      this.responseData.payload.data['roomWiseVastuScore'];
    console.log('room wise vastu score ' + this.roomWiseVastuScore);
    this.overallVastuScore = this.responseData.payload.data.overallVastuScore;
    console.log('overall vastu score ' + this.overallVastuScore);
    this.vastuScoreStatus = this.responseData.payload.data.vastuScoreStatus;
    console.log(' vastu score status' + this.vastuScoreStatus);



  }

  //method for get room details Api call
  getRoomDetails(item:any){
    this.RoomeName=item.room;
let obj={
  "roomName":item.room
}

this.dataService.post(ServerUrl.API_GET_ROOMDETAILS, obj).subscribe(response=>{
console.log(response)

this.getRoomDetailsList=response;
console.log("Room Detail List" + this.getRoomDetailsList);
this.favourableDirections =
      this.getRoomDetailsList.payload.data['favourableDirections'];
    console.log('favourable Directions is ' + this.favourableDirections);
    this.neutralDirections =
    this.getRoomDetailsList.payload.data['neutralDirections'];
  console.log('Neutral Directions is' + this.neutralDirections);
  this.unfavourableDirections =
  this.getRoomDetailsList.payload.data['unfavourableDirections'];
console.log('Unfavourable Directions is' + this.unfavourableDirections);

    this.aboutDescription = this.getRoomDetailsList.payload.data.aboutDescription;
    console.log('About Description is ' + this.aboutDescription);
    this.getLegendInfo=true;

})}


getDirectionDetails(item:any){
  console.log('get derection details');
  this.display = 'block';
  // debugger
this.ListDataName=item;
  console.log(item);
  //create object for passing request
  let direction = {
    direction: item,
  };
  //api call
  this.dataService
    .post(ServerUrl.API_GET_ROOMDETAILS_DIRECTION, direction)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.favourableDirectionsList =
          res.payload.data['favourableDirections'];
        console.log(this.favourableDirectionsList);
      },
      (err) => {
        console.log(err);
      }
    );
}

  }
