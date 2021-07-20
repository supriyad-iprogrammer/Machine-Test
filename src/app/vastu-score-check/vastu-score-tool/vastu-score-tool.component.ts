import { Dataservice } from './../../service/data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vastu-score-tool',
  templateUrl: './vastu-score-tool.component.html',
  styleUrls: ['./vastu-score-tool.component.css']
})
export class VastuScoreToolComponent implements OnInit {
  @Input() responseData:any;
dataList:any;

  constructor(private dataService:Dataservice) { }

  ngOnInit(): void {
    // this.dataService.responseData$.subscribe((response)=>

    // this.dataList=response

    // )

    console.log(this.responseData)

  }

}
