import { Dataservice } from './../service/data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ServerUrl } from '../core/constant/serverurl.constant';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-vastu-score-check',
  templateUrl: './vastu-score-check.component.html',
  styleUrls: ['./vastu-score-check.component.css'],
})
export class VastuScoreCheckComponent implements OnInit {
  isClickedCheckBox: boolean = false;
  isboxClicked: boolean = false;
  newArray: any = [];
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

  color = ['#FDEEE6', '#FFFFFF'];
  form: FormGroup;
  constructor(
    private dataService: Dataservice,
    private renderer: Renderer2,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {}
  onBoxClick(event: any, item: any, i: number, box: any) {
    // debugger
    this.isboxClicked = true;

    console.log(i);

    this.ListDataName = item;
    this.renderer.setStyle(box, 'background-color', this.color[i]);
    this.dataService
      .get(ServerUrl.API_ENDPOINT_GET_ROOMLIST)
      .subscribe((response: any) => {
        this.roomListData = response;
        this.roomListData = response.payload.data['roomList'];
        console.log(this.roomListData);
      });
  }
  addCheckboxValue(event: any, data: any) {
    console.log(data);
    // debugger
    this.isClickedCheckBox = true;
    var index = this.newArray.findIndex((x: { roomListData: any }) => {
      x.roomListData == data;
    });
    // If checked then push
    if (event) {
      let obj = {
        order: data,
      };
      // Pushing the object into array
      this.newArray.push(obj);
    } else {
      //remove element after we uncheck
      this.newArray.splice(index, 1);
    }

    //Duplicates the obj if we uncheck it
    //How to remove the value from array if we uncheck it
    console.log(this.newArray);

    console.log(this.newArray.length);
    if (this.newArray.length > 3) {
      // debugger;
      for (let i = 0; i >= this.newArray.length; i++) {
        let name = +this.newArray.length + 'more';
        console.log(name);
        this.ListDataName = data;
        console.log(this.ListDataName);

      }
      console.log('array length is more than 3');
    }
  }
  getDirectionDetails(event: any, item: any) {
    this.dataService
      .post(ServerUrl.API_GET_ROOMDETAILS_DIRECTION, item)
      .subscribe((res) => {
        console.log(res);
      });
  }
  reset() {
    this.newArray = [];
    this.roomListData = [];
  }

}
