import { map } from 'rxjs/operators';
import { Dataservice } from './../service/data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ServerUrl } from '../core/constant/serverurl.constant';


@Component({
  selector: 'app-vastu-score-check',
  templateUrl: './vastu-score-check.component.html',
  styleUrls: ['./vastu-score-check.component.css'],
})
export class VastuScoreCheckComponent implements OnInit {
  isCheckBoxClicked: boolean = false;
  isboxClicked: boolean = false;
  newArray: any = [];
  boxData: any[] = [
    {id:1, value:'North West',services: []},
    {id:2, value:'North',services: []},
    {id:3, value:'North East',services: []},
    {id:4, value:'West', services: []},
    {id:5, value:'Center',services: []},
    {id:6, value:'East',services: []},
    {id:7, value:'South West',services: []},
    {id:8, value:'South',services: []},
    {id:9, value:'South East',services: []}
  ];
  ListDataName: any;
  roomListData: any;

  color = ['#FDEEE6', '#FFFFFF'];

  constructor(private dataService: Dataservice, private renderer: Renderer2) {}

  ngOnInit(): void {}
  onBoxClick(item: any, i: number, box: any) {
    console.log(item);
    this.isboxClicked = true;

    this.ListDataName = item.value;

    this.dataService
      .get(ServerUrl.API_GET_ROOMLIST).subscribe((response: any) => {
        this.roomListData = response.payload.data['roomList'];
        console.log(this.roomListData)

      });
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


  console.log($event.target.value)
  var index = this.newArray.findIndex((x: { roomListData: any }) => {
      x.roomListData == data;
    });

    // If checked then push
    if ($event.target.checked) {
      let obj = {
        item: data,
      };
      // Pushing the object into array
      console.log(obj)


      this.newArray.push(obj);
console.log(this.newArray)


    } else {
      //remove element after we uncheck
      this.newArray.splice(index, 1);
    }

    // console.log(this.newArray.length);
    // if (this.newArray.length > 3) {
    //   // debugger;
    //   for (let i = 0; i >= this.newArray.length; i++) {
    //     let name = +this.newArray.length + 'more';
    //     console.log(name);
    //     this.ListDataName = data;
    //     console.log(this.ListDataName);
    //   }
    //   console.log('array length is more than 3');
    // }

//       if ($event.target.checked) {
//         debugger
//       console.log($event.target.value)
//       this.roomListData.filter((item: any) => {
//       if(item == this.ListDataName) {
//       item.services.push($event.target.value)
// console.log(item.services)
//       }
//       })
//       console.log(this.roomListData)


//       }
//       else {

//       this.roomListData.filter((item: any) => {
//       if(item.value == this.ListDataName) {
//       item.services.splice(item.services.indexOf($event.target.value), 1)
//       console.log(item.services)

//     }
//       })
//       }

      // console.log(this.directionsMap);


  }
  getDirectionDetails(event: any, item: any) {
    console.log(event.target.value);
    console.log(item);
    let direction={
      "direction":item
  }
    this.dataService
      .post(ServerUrl.API_GET_ROOMDETAILS_DIRECTION, direction)
      .subscribe((res) => {
        console.log(res);
      });
  }
  reset() {
    this.newArray = [];
    this.roomListData = [];
  }
}
