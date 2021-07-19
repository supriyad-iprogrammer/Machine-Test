import { map } from 'rxjs/operators';
import { Dataservice } from './../service/data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ServerUrl } from '../core/constant/serverurl.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vastu-score-check',
  templateUrl: './vastu-score-check.component.html',
  styleUrls: ['./vastu-score-check.component.css'],
})
export class VastuScoreCheckComponent implements OnInit {
  display = 'none';
  isCheckBoxClicked: boolean = false;
  isboxClicked: boolean = false;
  newArray: any = [];

  boxData: any[] = [
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

  constructor(
    private dataService: Dataservice,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {}
  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }
  onBoxClick(item: any, i: number, box: any) {
    console.log(item);
    this.isboxClicked = true;

    this.ListDataName = item.value;
    if (this.isboxClicked == true) {
      this.dataService
        .get(ServerUrl.API_GET_ROOMLIST)
        .subscribe((response: any) => {
          this.roomListData = response.payload.data['roomList'];
          console.log(this.roomListData);
        });
    }

    if (this.isCheckBoxClicked == true && this.isboxClicked == true) {
      console.log(box);
      this.renderer.setStyle(box, 'background', this.color[i]);
    }
  }
  addCheckBoxValue($event: any, data: any) {
    // debugger
    console.log(data);
    console.log($event.target.value);

    // debugger
    this.isCheckBoxClicked = true;

    console.log($event.target.value);

    // If checked then push
    if ($event.target.checked) {
      this.boxData.filter((item: any) => {
        // debugger
        if (item.value == this.ListDataName) {
          item.DirectionNameList.push(data);

          console.log(this.boxData);
        }
      });
    } else {
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
    this.display = 'block';
    // debugger

    console.log(event.target.value);
    console.log(item);
    let direction = {
      direction: item,
    };
    this.dataService
      .post(ServerUrl.API_GET_ROOMDETAILS_DIRECTION, direction)
      .subscribe((res: any) => {
        console.log(res);
        this.favourableDirectionsList =
          res.payload.data['favourableDirections'];
        console.log(this.favourableDirectionsList);
      });
  }
  //reset all list
  reset() {
    this.newArray = [];
    this.roomListData = [];
  }
  //for get vastu score with post method call
  getVastuScore() {
    console.log('hiiiiiiiiii');

    let obj = {
      selectedRoomsAndDirection: {
        'North West': [],
        North: ['Balcony'],
        'North East': [
          'Dining Room',
          'Drawing Room',
          'Dressing Room',
          'Garage',
          'Guest Bedroom',
          'Kitchen',
          'Living Room',
        ],
        West: ['Open Space'],
        Centre: ['Pooja Room'],
        East: ['Bathroom', 'Children Bedroom'],
        'South West': [],
        South: [
          'Main Entrance of home',
          'Underground Tank',
          'Open Space',
          'Porch',
          'Staircase',
          'Store Room',
          'Toilet',
          'Utility Room',
          'Parking',
          'Verandah',
        ],
        'South East': [],
      },
    };

    this.dataService
      .post(ServerUrl.API_GET_VASTUSCORE,obj)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
