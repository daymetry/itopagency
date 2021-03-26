import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public subject: any;
  public format: string = 'HH:mm:ss';
  public lastClickW = false;
  public timeIsRun = false;
  public Time$: any = moment().hour(0).minutes(0).seconds(0);
  public TimeView$: any = moment().hour(0).minutes(0).seconds(0).format(this.format);

  constructor() {
  }

  dblClick () {
    setTimeout(() => {
      this.lastClickW = false;
    }, 300);

    this.lastClickW = true;
  }

  start() {
    if (this.timeIsRun) {
      this.wait();
      this.reset();
    }else {
      this.subject =
           interval(1000)
          .subscribe(() => {
            this.Time$ = moment(this.Time$).add(1, 'second');
            this.TimeView$ = this.Time$.format(this.format);
          })
      this.timeIsRun = true;
    }
  }

  wait() {
    if (this.lastClickW && this.timeIsRun) {
      this.subject.unsubscribe();
      this.timeIsRun = false;
    }
    this.dblClick();
  }

  reset() {
    this.Time$ = moment().hour(0).minutes(0).seconds(0);
    this.TimeView$ = this.Time$.format(this.format);
  }
}
