import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { By } from '@angular/platform-browser';

describe('calendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let today:Date = new Date();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct month and year',()=>{
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3).toBeTruthy();
    const text = h3.nativeElement.innerHTML;
    expect(text).toContain(component.monthName);
    expect(text).toContain(today.getFullYear());
  });

  it('should display 7 days of week in header',()=>{
    const weekdays = fixture.debugElement.queryAll(By.css('.weekdays span'));
    expect(weekdays.length).toBe(7);
    weekdays.forEach((element,i)=>{
      expect(element.nativeElement.innerHTML.trim()).toBe(component.weekdays[i]);
    });
  });

  it('should initialize correct number of days for current month',()=>{
    const dates = fixture.debugElement.queryAll(By.css('.dates span'));
    const daysInMonth= new Date(component.year,component.month+1,0).getDate();
    expect(dates.length).toBe(daysInMonth);
    dates.forEach((element,i)=>{
        expect(element.nativeElement.innerHTML.trim()).toBe((i+1).toString());
    });
  });

  it('should display past dates in gray font',()=>{
    const pastDate = (today.getDate()-1)%29;
    component.month=(component.month+11)%12
    const style=component.styleDate(pastDate);
    expect(style['color']).toBe('gray');
  });

  it('should display gray background for today',()=>{
    const todayDate=today.getDate();
    const style=component.styleDate(todayDate);
    expect(style['background-color']).toBe('gray');
  });

  it('should display green when clicked on a valid today/future date',()=>{
    const dateSpans = fixture.debugElement.queryAll(By.css('.dates span'));
    // //click next month to get a valid selected date
    // const nextBtn = fixture.debugElement.query(By.css('.next'));
    // nextBtn.triggerEventHandler('click',null);

    //click on a date and load DOM changes
    const dateToClick = today.getDate();
    const clickedDay = parseInt(dateSpans[dateToClick].nativeElement.textContent.trim(),10);
    dateSpans[dateToClick].triggerEventHandler('click',null);
    fixture.detectChanges();

    expect(component.selectedDate).toBeTruthy;
    expect(component.selectedDate?.getDate()).toBe(clickedDay);
    console.log(dateSpans[dateToClick].nativeElement.getAttribute('style'));
    expect(dateSpans[dateToClick].nativeElement.style['background-color']).toBe('green');
  });

  it('should go to prevMonth when prevMonth is called',()=>{
    const prevBtn = fixture.debugElement.query(By.css('.prev'));
    const prevMonth=(component.month+11)%12;
    prevBtn.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(component.month).toBe(prevMonth);
  });

  it('should go to nextMonth when next Month is called'),()=>{
    const nextBtn = fixture.debugElement.query(By.css('.next'));
    const nextMonth=(component.month+1)%12;
    nextBtn.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(component.month).toBe(nextMonth);
  }

});
