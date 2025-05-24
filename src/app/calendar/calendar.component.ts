import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private today:Date=new Date();
  weekdays:string[]=['S','M','T','W','T','F','S'];
  monthName:string;
  month:number;
  year:number;
  days:(number|null)[];
  selectedDate:Date|null=null;
  selectedDate$ = new BehaviorSubject<Date|null>(null);

  constructor() { 
    this.today.setHours(0,0,0,0);
    this.month=this.today.getMonth();
    this.monthName=this.today.toLocaleString('default',{'month':'short'});
    this.year=this.today.getFullYear();
    this.days = this.generateDays(this.year,this.month);
  }

  ngOnInit(): void {
    this.selectedDate$.subscribe(date=>{
      this.selectedDate=date;
    });
  }

  // generate the days array for the current month
  generateDays(year:number, month:number):(number|null)[]{
    let monthDays=new Date(year,month+1,0).getDate();
    let firstDay=new Date(year,month,1).getDay();
    return Array.from({length:firstDay+monthDays},(_,i)=>
      i<firstDay?null:i-firstDay+1
    );
  }

  //styling for date values - gray font for past date, gray background on current and green background on selected dates
  styleDate(date:number):{[key:string]:string}{
    let style:{[key:string]:string}={};
    let currDate=new Date(this.year,this.month,date);
    if (currDate.getTime()<this.today.getTime()){
      style['color']='gray';
    }else{
      style['cursor']='pointer';
    }
    if (currDate.getTime()===this.today.getTime()){
      style['background-color']='gray';
    }
    if (this.selectedDate && this.selectedDate.getTime()>=this.today.getTime() && currDate.getTime()===this.selectedDate?.getTime()){
      style['background-color']='green';
    }
    return style;
  }

  onDateClick(date:number):void{
    this.selectedDate$.next(new Date(this.year,this.month,date));
  }
  //handler for prev month button
  prevMonth(){
    let prevMonth=new Date(this.year,this.month-1);
    this.month=prevMonth.getMonth();
    this.year=prevMonth.getFullYear();
    this.monthName=prevMonth.toLocaleString('default',{'month':'short'});
    this.days=this.generateDays(this.year,this.month);
  }

  //handler for next month button
  nextMonth(){
    let nextMonth=new Date(this.year,this.month+1);
    this.month=nextMonth.getMonth();
    this.year=nextMonth.getFullYear();
    this.monthName=nextMonth.toLocaleString('default',{'month':'short'});
    this.days=this.generateDays(this.year,this.month);
  }
}
