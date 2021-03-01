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
import {User} from "../../entities/user";



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


export interface MyEvent extends CalendarEvent {
  activity?: string;
  number: string;
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
  @ViewChild('contentDelete', { static: true }) contentDelete: TemplateRef<any>;
  @ViewChild('contentMod', { static: true }) contentMod: TemplateRef<any>;
  @ViewChild('contentModpres', { static: true }) contentModpres: TemplateRef<any>;

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

  eventi: Evento[];
  evento: Evento;




  actions: CalendarEventAction[] = [
    /**{
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },**/
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        /**this.handleEvent('Deleted', event);*/
        this.open(this.contentDelete, event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-user-circle"></i>',
      a11yLabel: 'Partecipanti',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.evento.id = String(event.id);
        if(event.start>new Date())
        {
          console.log("prenotati")
          this.prenotati();
          this.open(this.contentMod, event);}
        else
        {
          console.log("presenti")
          this.presenti();

          this.open(this.contentModpres, event);
        }
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: MyEvent[] ;


  activeDayIsOpen: boolean = true;
  activities: any;
  numPrenot: any;
  booked: User[];

  constructor(private modal: NgbModal,
              private modalService: NgbModal, private attivitaService: AttivitaServiceService, private eventService: EventService
  ) {
    this.evento = new Evento();

  }

  ngOnInit() {
    this.attivitaService.findAll().subscribe(data => {
      this.activities = data;

    });
    this.events=[];
    this.eventService.findAll().subscribe(data => {
      console.log(data);
      this.eventi = data;
      this.parseEvent();
      let element:HTMLElement = document.getElementById('oggibtn') as HTMLElement;
      element.click();
    });



  }

  open(targetModal, ev: CalendarEvent) {
    this.evento.id = String(ev.id);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
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
          number: "0",
          id: "0"
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

private titleDay: string;
  private activityDay: string;
  parseEvent()
  {
    for(let i=0; i<this.eventi.length; i++){


      console.log(this.eventi[i].inizio)
      console.log(this.eventi[i].dataFine)
      this.titleDay=this.getNameActFromId(this.eventi[i].activityId);
      var start = new Date(this.eventi[i].inizio)
      var end = new Date(this.eventi[i].dataFine)
      this.activityDay = this.eventi[i].activityId
      this.numPrenot = this.eventi[i].number
      this.events.push(
        {
          title: this.titleDay,
          start: start,
          end: end,
          id: this.eventi[i].id,
          color: colors.red,
          activity: this.activityDay,
          actions: this.actions,
          number: this.numPrenot,
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
        }
      );
    }

  }

  public onDelete(): void{
    for (var eve of this.eventi) {
      if(eve.id==this.evento.id) {
        this.evento = eve;
      }
    }
    this.eventService.delete(this.evento).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
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
        this.addEventPar(this.attivitaAssociata,start,end, this.numPrenot)
      }
    }
    this.events = [];
    this.modalService.dismissAll();
    this.ngOnInit();

  }

  public toStringDate(date: Date){
    var str = ""
    var mes = ""
    str = str + date.getFullYear() + "-"
    console.log("data: "+ date);
    mes = "" + (date.getMonth()+1);
    if(mes.length==1)
      str = str + "0"
    str = str + mes + "-"
    mes = "" + date.getDate();
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

  addEventPar(id: any,start: Date,end: Date, num: string): void {
    //console.log(start.getHours());

    this.evento.title = this.getNameActFromId(id);
    this.evento.dataFine = this.toStringDate(end);
    this.evento.inizio = this.toStringDate(start);
    this.evento.number = num;
    this.evento.activityId = id;
    console.log("Questo è l'evento: "+ this.evento);

    this.eventService.save(this.evento).subscribe();

}

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
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
  selectOption(name: string): void{
    //console.log("THIS IS THE: "+name);
    this.attivitaAssociata = name;
  }
  prenotati(): void{
    this.booked = [];
    this.eventService.findBookedFromEventId(this.evento.id).subscribe(data => {
      this.booked = data;
    });
  }

  presenti(): void{
    this.booked = [];
    this.eventService.findPresenceFromEventId(this.evento.id).subscribe(data => {
      this.booked = data;
    });
  }
}
