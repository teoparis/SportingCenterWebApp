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
import {EventService} from "../../service/event.service";
import {Evento} from "../../entities/evento"
const colors: any = {
  fitnees: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  nuoto: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  nuotoAndFitness: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


export interface MyEvent extends CalendarEvent {

  activity?: any;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})



export class MapsComponent implements OnInit{




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
  title: any;



  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.eventsForCalendar = this.eventsForCalendar.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  eventsForCalendar: MyEvent[] = [];
  events: Evento[];

  activeDayIsOpen: boolean = true;
  activities: any;
  numPrenot: any;
  private evento: any;

  constructor(private modal: NgbModal,
              private modalService: NgbModal, private attivitaService: AttivitaServiceService, private eventService: EventService) {

  }

  ngOnInit() {
    this.attivitaService.findAll().subscribe(data => {
      this.activities = data;
    });
    this.eventService.findAll().subscribe(data => {
      this.events = data;
    });
    this.parseEvent();
  }

  private getNameActFromId(id: string){
    for(let i=0; i<this.activities.length; i++){
      if(this.activities[i].id==id){
        return this.activities[i].name;
      }
    }
    return ""
  }


  parseEvent()
  {
    for(let i=0; i<this.events.length; i++){
      this.eventsForCalendar = [
        ...this.eventsForCalendar,
        {
          title: this.getNameActFromId(this.events[i].activity_id),
          start: this.events[i].dataInizio as unknown as Date,
          end: this.events[i].dataFine  as unknown as Date,
          color: colors.nuoto,
          activity: this.events[i].activity_id,
          actions: this.actions,
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
        },
      ];
    }

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
    this.eventsForCalendar = this.eventsForCalendar.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.oraInizioP=event.start.getHours()+":"+event.start.getMinutes()
    this.oraFineP=event.end.getHours()+":"+event.end.getMinutes()
    this.dataInizioP=event.start
    this.title=event.title;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.eventsForCalendar = [
      ...this.eventsForCalendar,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        activity: new Attivita(),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  extractDays(): void{
    this.giorniSettimanali = [];
    var element = <HTMLInputElement> document.getElementById("weekday-mon");
    if(element.checked)
      this.giorniSettimanali.push(1);
    element = <HTMLInputElement> document.getElementById("weekday-tue");
    if(element.checked)
      this.giorniSettimanali.push(2);
    element = <HTMLInputElement> document.getElementById("weekday-wed");
    if(element.checked)
      this.giorniSettimanali.push(3);
    element = <HTMLInputElement> document.getElementById("weekday-thu");
    if(element.checked)
      this.giorniSettimanali.push(4);
    element = <HTMLInputElement> document.getElementById("weekday-fri");
    if(element.checked)
      this.giorniSettimanali.push(5);
    element = <HTMLInputElement> document.getElementById("weekday-sat");
    if(element.checked)
      this.giorniSettimanali.push(6);
  }


  addEventProgram(){
    //console.log(endDate.getDay());
    this.extractDays();
    //console.log(this.giorniSettimanali);
    var orastart = this.mygetHours(this.oraInizioP);
    var minstart = this.mygetMinute(this.oraInizioP);
    var oraend = this.mygetHours(this.oraFineP);
    var minend = this.mygetMinute(this.oraFineP);
    let currentDate = this.dataInizioP;
    while(currentDate <= this.dataFineP) {
      currentDate = new Date(currentDate.setDate(currentDate.getDate()+1));

     // this.oraInizioP = (<HTMLInputElement> document.getElementById("oraInizio")).value;
     // this.oraFineP = (<HTMLInputElement> document.getElementById("oraFine")).value;
      if(this.giorniSettimanali.includes(currentDate.getDay()))
      {
        console.log(this.oraInizioP);
        console.log(this.oraFineP);
        var start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), orastart, minstart, 0);
        var end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), oraend, minend, 0);
        this.addEventPar(this.attivitaAssociata,start,end)
      }
    }
    this.modalService.dismissAll();
  }

  addEventPar(id: any,start: Date,end: Date): void {
    //console.log(start.getHours());

    this.evento.name = this.getNameActFromId(id);
    this.evento.dataFine = end;
    this.evento.dataInizio = start;
    this.evento.colore = colors.nuoto;
    this.evento.activity_id = id;
    console.log("Questo è l'evento: "+ this.evento);
    this.eventService.save(this.evento).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.eventsForCalendar = [
      ...this.eventsForCalendar,
      {
        title: this.getNameActFromId(id),
        start: start,
        end: end,
        color: colors.nuoto,
        activity: id,
        actions: this.actions,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.eventsForCalendar = this.eventsForCalendar.filter((event) => event !== eventToDelete);
  }

  modifyEvent(event: CalendarEvent)
  {
    event.start.setHours(this.parseTime(this.oraInizioP)[0],this.parseTime(this.oraInizioP)[1])
    console.log(event.start);
    console.log(event.end);
    console.log(event.start);
   /* this.authService.modify(this.user,true).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the table
      });

    */
    this.modalService.dismissAll();
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
  selectOption(id: string): void{
     this.attivitaAssociata = id;
  }
}
