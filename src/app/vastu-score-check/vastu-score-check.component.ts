import { VastuScoreToolComponent } from './vastu-score-tool/vastu-score-tool.component';
import { Dataservice } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import { ServerUrl } from '../core/constant/serverurl.constant';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vastu-score-check',
  templateUrl: './vastu-score-check.component.html',
  styleUrls: ['./vastu-score-check.component.css'],
})
export class VastuScoreCheckComponent implements OnInit {
  goback: boolean = true;
  favList:boolean=false;
  boxActive: any;
  getLegendInfo: boolean = false;
  display = 'none';
  isCheckBoxClicked: boolean = false;
  isboxClicked: boolean = false;
  public subscription!: Subscription;
  calculateScore: boolean = false;
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
  selectedCheckbox: any;
  responseData: any;

  dataList: any;




  roomWiseVastuScore: any;
  overallVastuScore: any;
  vastuScoreStatus: any;
  getRoomDetailsList: any;
  favourableDirections: any;
  neutralDirections: any;
  unfavourableDirections: any;
  aboutDescription: any;

  RoomeName: any;

  constructor(
    private dataService: Dataservice,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

  }
  //for open modal page
  openModal() {
    this.display = 'block';
  }
  //for close modal page
  onCloseHandled() {
    this.display = 'none';

  }
  //function on box clicked
  onBoxClick(item: any, i: number) {
    // debugger
    console.log(item);
    this.selectedItem = item;
    if (this.selectedItem == item) {
      this.isboxClicked = true;
      this.ListDataName = item.value;
      //api call for get data
      this.subscription = this.dataService
        .get(ServerUrl.API_GET_ROOMLIST)
        .subscribe(
          (response: any) => {
            this.roomListData = response.payload.data['roomList'];
            console.log(this.roomListData);
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.selectedItem == item) {
      this.isboxClicked = false;
      this.selectedItem = null;
      this.selectedCheckbox = null;
    }
  }
  //fuction after checked a value
  addCheckBoxValue($event: any, data: any) {
    console.log($event.target.value);
    // for add element after check
    if ($event.target.checked) {
      this.boxData.filter((item: any) => {
        // debugger
        if (item.value == this.ListDataName) {
          item.DirectionNameList.push(data);
          console.log(this.boxData);
          this.isCheckBoxClicked = true;
          this.selectedCheckbox = item;
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
          // this.isCheckBoxClicked = false;
          // this.selectedItem = null;
          // this.selectedCheckbox = null;
          console.log(this.boxData);
        }
      });
    }
  }
  // for get direction details from posth method
  getDirectionDetails(event: any, item: any) {
    console.log('get derection details');
this.favList=true;
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

  closeFavList(){
    this.favList=false;
  }
  //for get vastu score with post method call
  getVastuScore() {
    // debugger
    console.log('get vastu score');
    this.display = 'block';
    //create object
    const obj: any = {};
    this.boxData.map((item: any) => {
      let key: string = item.value;
      obj[key] = item.DirectionNameList;
    });
    //create body
    const dataModel = {
      selectedRoomsAndDirection: JSON.parse(JSON.stringify(obj)),
    };
    console.log(dataModel);
    //api call
    this.dataService.post(ServerUrl.API_GET_VASTUSCORE, dataModel).subscribe(
      (res: any) => {
        console.log(res);
        this.responseData = res;
        console.log(this.responseData);
        this.roomWiseVastuScore = this.responseData.payload.data['roomWiseVastuScore'];
        console.log('room wise vastu score ' + this.roomWiseVastuScore);
        this.overallVastuScore = this.responseData.payload.data.overallVastuScore;
        console.log('overall vastu score ' + this.overallVastuScore);
        this.vastuScoreStatus = this.responseData.payload.data.vastuScoreStatus;
        console.log(' vastu score status' + this.vastuScoreStatus);
        // this.calculateScore = true;

       // use for pass data using service
        // this.router.navigate(['/vastuTool']);
        //   this.dataService.sendData(this.responseData)

        //use for pass data using router parameter

        // this.router.navigate(['/vastuTool'],{
        //   queryParams:{data:JSON.stringify(this.responseData) }
        // });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //reset all list
  reset() {
    this.isboxClicked = false;
    this.isCheckBoxClicked = false;
    this.selectedCheckbox = null;
    this.selectedItem = null;
     this.roomListData = [];
    this.boxData.filter((item: any) => {
      item.DirectionNameList = [];
    });
  }






  modalBackArrow(){
    this.getLegendInfo=false;
    this.display = 'block';
  }
  getRoomDetails(item: any) {
    this.RoomeName = item.room;
    let obj = {
      roomName: item.room,
    };
    this.dataService
      .post(ServerUrl.API_GET_ROOMDETAILS, obj)
      .subscribe((response) => {
        console.log(response);
        this.getRoomDetailsList = response;
        console.log('Room Detail List' + this.getRoomDetailsList);
        this.favourableDirections =
          this.getRoomDetailsList.payload.data['favourableDirections'];
        console.log('favourable Directions is ' + this.favourableDirections);
        this.neutralDirections =
          this.getRoomDetailsList.payload.data['neutralDirections'];
        console.log('Neutral Directions is' + this.neutralDirections);
        this.unfavourableDirections =
          this.getRoomDetailsList.payload.data['unfavourableDirections'];
        console.log('Unfavourable Directions is' + this.unfavourableDirections);
        this.aboutDescription =
          this.getRoomDetailsList.payload.data.aboutDescription;
        console.log('About Description is ' + this.aboutDescription);
        this.getLegendInfo = true;
      });
  }
  onCheckSecondPlan() {
    // debugger
    console.log('check for second plane');
    this.display = 'none';
  this.reset()
    //  this.router.navigate(['/vastuScore'],{relativeTo:this.route});

   }
   openDialog() {
    const dialogRef = this.dialog.open(VastuScoreCheckComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

