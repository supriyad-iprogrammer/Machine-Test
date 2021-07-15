import { DataserviceService } from './../service/data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ServerUrl } from '../core/constant/serverurl.constant';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-vastu-score-check',
  templateUrl: './vastu-score-check.component.html',
  styleUrls: ['./vastu-score-check.component.css'],
})
export class VastuScoreCheckComponent implements OnInit {
  isClickedCheckBox: boolean = false;
  isboxClicked: boolean = false;
  boxData: string[] = [
    'NORTH WEST',
    'NORTH',
    'NORTH EAST',
    'WEST',
    'CENTER',
    'EAST',
    'SOUTH WEST',
    'SOUTH',
    'SOUTH EAST',
  ];
  ListDataName: any[] = [];
  roomListData: any;
  afterCheckedValue: any[] = [];
  color = ['#FDEEE6','#FFFFFF'];
  constructor(private dataService: DataserviceService,private renderer:Renderer2) {}

  ngOnInit(): void {}
  onBoxClick(event: any, item: any, i:number,box:any) {
    // debugger
    this.isboxClicked = true;

    console.log(i);
    this.ListDataName = item;
    this.renderer.setStyle(box,'background-color',this.color[i]);
    this.dataService
      .get(ServerUrl.API_ENDPOINT_GET_ROOMLIST)
      .subscribe((response) => {
        this.roomListData = response;
        console.log(this.roomListData);
      });
  }
  addCheckboxValue(i: any) {
    console.log(i);
    this.afterCheckedValue.push(i);
    this.isClickedCheckBox = true;
  }
  getDirectionDetails(event: any, item: any) {
    this.dataService
      .post(ServerUrl.API_GET_ROOMDETAILS_DIRECTION, item)
      .subscribe((res) => {
        console.log(res);
      });
  }
  reset() {
  this.afterCheckedValue=[];
  this.roomListData=[];
  }
}
