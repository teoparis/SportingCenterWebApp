import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import {Attivita} from "../../entities/attivita";
import { CustomEventTitleFormatter } from 'src/app/service/CustomEventTitleFormatter';
import {Time} from "@angular/common";
import {newArray} from "@angular/compiler/src/util";
import {ActivitiesComponent} from "../activities/activities.component";
import {AttivitaServiceService} from "../../service/attivita-service.service";
import {FormGroup} from "@angular/forms";
import {Evento} from "../../entities/evento";
import {EventService} from "../../service/event.service";
import {MyEvent} from "../maps/maps.component";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user-service.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})

export class UserCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  dataInizioP: any;
  dataFineP: any;
  oraInizioP: any;
  oraFineP: any;
  giorniSettimanali = [];
  attivitaAssociata: string;
  descr: any;
  abbonam: any;
  eventi: Evento[];
  evento: Evento;
  eventoPren: CalendarEvent;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Prenotati',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    }
  ];

  events: MyEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
      number: "0",
    }
  ];


  refresh: Subject<any> = new Subject();



  activeDayIsOpen: boolean = true;
  activities: any;
  numPrenot: any;


  constructor(private modal: NgbModal, private token: TokenStorageService, private userService: UserService,
              private modalService: NgbModal, private attivitaService: AttivitaServiceService, private eventService: EventService
  ) {
    this.evento = new Evento();

  }
currentUser: any;
  ngOnInit() {
    this.currentUser = this.token.getUser();

    this.userService.subIdByUserId(this.currentUser.id).subscribe(data => {
      console.log(data)
      this.abbonam = data;
      this.eventService.getEventsForUser(this.abbonam).subscribe(data => {
        console.log(data);
        this.eventi = data;
        this.parseEvent();
      });
    });


  }

  private getNameActFromId(id: string){
    for(let i=0; i<this.activities.length; i++){
      if(this.activities[i].id==id){
        return this.activities[i].name;
      }
    }
    return ""
  }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
          number: "",
          id: "0"
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.eventoPren = event
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  prenota(): void {
    console.log("SIAMO ARRIVATI ALLA PRENOTAZIONE")
    this.eventService.prenotaAttivita(this.currentUser.id,String(this.eventoPren.id)).subscribe((result) => {
      console.log("SIAMO nella prenotazione")
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  private titleDay: string;
  private activityDay: string;
  parseEvent() {
    console.log(this.eventi[0].inizio as unknown as Date)
    console.log(this.eventi[0].title)
    for(let i=0; i<this.events.length; i++){


      console.log(this.eventi[i].title)
      this.titleDay=this.eventi[i].title;
      var start = new Date(this.eventi[i].inizio)
      var end = new Date(this.eventi[i].dataFine)
      this.activityDay = this.eventi[i].activityId
      this.numPrenot = this.eventi[i].number
      this.events = [
        ...this.events,
        {
          title: this.titleDay,
          start: start,
          end: end,
          color: colors.red,
          id: this.eventi[i].id,
          activity: this.activityDay,
          actions: this.actions,
          number: this.numPrenot,
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
        },
      ];
      console.log(this.events)
    }

  }



  public toStringDate(date: Date){
    var str = ""
    var mes = ""
    str = str + date.getFullYear() + "-"
    console.log("Mese: "+ date.getMonth());
    mes = "" + date.getMonth();
    if(mes.length==1)
      str = str + "0"
    str = str + mes + "-"
    mes = "" + date.getDay();
    if(mes.length==1)
      str = str + "0"
    str = str + mes + "T"
    mes = "" + date.getHours();
    if(mes.length==1)
      str = str + "0"
    str = str + mes + ":"
    mes = "" + date.getMinutes();
    if(mes.length==1)
      str = str + "0"
    str = str + mes + ":"
    mes = "" +date.getSeconds();
    if(mes.length==1)
      str = str + "0"
    str = str + mes

    return str
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  openNewProgramSpec(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }


  parseDate(dateString: string): Date {
    if (dateString) {
      //console.log("THIS IS THE: "+dateString);
      return new Date(dateString);
    }
    return null;
  }

  parseTime(time: string): any {
    if (time) {
      //console.log("THIS IS THE: "+time);
      return time.split(":");
    }
    return null;
  }

  mygetHours(time: string[]): any{
    return <Number><unknown>time[0];
  }
  mygetMinute(time: string[]): any{
    return <Number><unknown>time[1];
  }

}
