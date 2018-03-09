import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

interface Event {
  source: Subject<any>;
  observable: any;
}

const eventMap: Map<string, Event> = new Map<string, Event>();

@Injectable()
export class NegEventBus {
  constructor() { }

  emit(eventName: string, data?: any): boolean {
    if (eventMap.has(eventName)) {
      eventMap.get(eventName).source.next(data);
      return true;
    };
    return false;
  }

  on(eventName: string, handler: Function): Subscription {
    let eventObservable;
    if (!eventMap.has(eventName)) {
      let eventSource = new Subject<any>();
      eventObservable = eventSource.asObservable();
      eventMap.set(eventName, { source: eventSource, observable: eventObservable });
    } else {
      eventObservable = eventMap.get(eventName).observable;
    }
    return eventObservable.subscribe(handler);
  }

  once(eventName, handler: Function): void{
    let sub;
    let fn =  (...params) => {
      handler(...params);
      if(sub){
        sub.unsubscribe();
      }
    };
    sub = this.on(eventName, fn);
  }
}
