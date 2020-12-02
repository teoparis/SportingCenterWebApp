import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { MyEvent } from 'src/app/pages/maps/maps.component'
@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: MyEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

}
