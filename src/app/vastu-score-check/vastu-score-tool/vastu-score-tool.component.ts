import { ServerUrl } from './../../core/constant/serverurl.constant';
import { Dataservice } from './../../service/data.service';

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  roomWiseVastuScore: any;
  overallVastuScore: any;
  vastuScoreStatus: any;
  constructor(private router: Router,
    private dataService:Dataservice) {}

  ngOnInit(): void {


    this.getdata();
  }
  //method for store data in variable
  getdata() {

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
  getRoomDetails(item:any){
let obj={
  "roomName":item.room
}

this.dataService.post(ServerUrl.API_GET_ROOMDETAILS, obj).subscribe(response=>{
console.log(response)
})
  }
}
