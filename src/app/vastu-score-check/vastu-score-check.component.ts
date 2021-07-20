
import { Dataservice } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import { ServerUrl } from '../core/constant/serverurl.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vastu-score-check',
  templateUrl: './vastu-score-check.component.html',
  styleUrls: ['./vastu-score-check.component.css'],
})
export class VastuScoreCheckComponent implements OnInit {
  calculateScore:boolean=false;
  display = 'none';
  isCheckBoxClicked: boolean = false;
  isboxClicked: boolean = false;
public subscription!:Subscription;

  boxData = [
    { id: 1, value: 'North West', DirectionNameList: [] },
    { id: 2, value: 'North', DirectionNameList: [] },
    { id: 3, value: 'North East', DirectionNameList: [] },
    { id: 4, value: 'West', DirectionNameList: [] },
    { id: 5, value: 'Center', DirectionNameList: [] },
    { id: 6, value: 'East', DirectionNameList: [] },
    { id: 7, value: 'South West', DirectionNameList: [] },
    { id: 8, value: 'South', DirectionNameList: [] },
    { id: 9, value: 'South East', DirectionNameList: [] },
  ];
  ListDataName: any;
  roomListData: any;
  favourableDirectionsList: any;
  color = ['#FDEEE6', '#FFFFFF'];
  selectedItem: any;
  responseData: any;
  roomWiseVastuScore:any;
  overallVastuScore: any;
  vastuScoreStatus: any;
  dataList: any;
  constructor(
    private dataService: Dataservice,
    private router: Router,

  ) {}

  ngOnInit(): void {}
//for open modal page
  openModal() {
    this.display = 'block';
  }
  //for close modal page
  onCloseHandled() {
    this.display = 'none';
  }
  //function on box clicked
  onBoxClick(item: any, i:number) {
    console.log(item);
    this.isboxClicked = true;
    this.ListDataName = item.value;
    this.selectedItem = item;
    if (this.isboxClicked == true) {
      //api call for get data
    this.subscription=  this.dataService
        .get(ServerUrl.API_GET_ROOMLIST)
        .subscribe((response: any) => {
          this.roomListData = response.payload.data['roomList'];
          console.log(this.roomListData);
        },(err)=>{
          console.log(err)
        });
    }

  }
  //fuction after checked a value
  addCheckBoxValue($event: any, data: any) {
    this.isCheckBoxClicked = true;

    console.log($event.target.value);
    // for add element after check
    if ($event.target.checked) {
      this.boxData.filter((item: any) => {
        // debugger
        if (item.value == this.ListDataName) {
          item.DirectionNameList.push(data);
          console.log(this.boxData);

        }
      });
    } else {
      //for remove unchecked element
      this.boxData.filter((item: any) => {
        if (item.value == this.ListDataName) {
          item.DirectionNameList.splice(
            item.DirectionNameList.indexOf(data),
            1
          );


          console.log(this.boxData);
        }
      });
    }
  }

  // for get direction details from posth method
  getDirectionDetails(event: any, item: any) {
    console.log('get derection details');
    this.display = 'block';
    // debugger

    console.log(event.target.value);
    console.log(item);
    //create object for passing request
    let direction = {
      direction: item,
    };
    //api call
    this.dataService
      .post(ServerUrl.API_GET_ROOMDETAILS_DIRECTION, direction)
      .subscribe((res: any) => {
        console.log(res);
        this.favourableDirectionsList =
          res.payload.data['favourableDirections'];
        console.log(this.favourableDirectionsList);
      },(err)=>{
        console.log(err)
      });
  }

  //for get vastu score with post method call
  getVastuScore() {
    this.calculateScore=true;
    console.log('get vastu score');

// map for transfor data for passing request

//create object
    const obj:any = {};

    this.boxData.map((item: any) => {
    let key:string = item.value
    obj[key] = item.DirectionNameList;

    })
//create body
    const dataModel = {
    "selectedRoomsAndDirection": JSON.parse(JSON.stringify(obj))
    }

console.log(dataModel)
//api call
    this.dataService
      .post(ServerUrl.API_GET_VASTUSCORE, dataModel)
      .subscribe((res:any) => {
        console.log(res)
        this.responseData=res;
        console.log(this.responseData)
//         this.roomWiseVastuScore = res.payload.data.roomWiseVastuScore;
//         console.log(this.roomWiseVastuScore)
//  this.overallVastuScore = res.payload.data.overallVastuScore;
//  console.log(this.overallVastuScore);
//  this.vastuScoreStatus = res.payload.data.vastuScoreStatus;

// console.log(this.vastuScoreStatus)

// this.dataService.sendData(res);

console.log(res)
      },(err)=>{
        console.log(err)
      }
      );

      this.router.navigate(['/vastuScoreTool']);

      // this.dataService.sendData(this.roomWiseVastuScore);
  }
   //reset all list
   reset() {
this.isboxClicked=false;
this.isCheckBoxClicked=false


this.subscription.unsubscribe();

  }
}
