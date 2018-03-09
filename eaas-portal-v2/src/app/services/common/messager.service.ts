import { Injectable } from '@angular/core'; 
import { Router, NavigationStart } from '@angular/router'; 
import { Observable } from 'rxjs'; 
import { Subject } from 'rxjs/Subject';
@Injectable() 
export class MessagerService {
    private subject = new Subject<any>();
    constructor(){}
    confirm(message: string,okFn:()=>void,noFn:()=>void){
        this.setConfirmation(message,okFn,noFn);
    }
    setConfirmation(message: string,okFn:()=>void,noFn:()=>void) {
        let that = this;
        this.subject.next(
            { 
                type: "confirm",
                class: "default",
                text: message,
                okFn: function(){
                    that.subject.next({type: "close"}); //this will close the modal
                    okFn();
                },
                noFn: function(){
                    that.subject.next({type: "close"});
                    noFn();
                }
            });
    }

    info(message: string){
        this.setInformation(message);
    }
    setInformation(message: string) {
        let that = this;
        this.subject.next(
            { 
                type: "info",
                text: message,
                show:true,
                class: "alert-info"
            });
    }

    success(message: string){
        this.setSuccess(message);
    }
    setSuccess(message: string) {
        let that = this;
        this.subject.next(
            { 
                type: "success",
                text: message,
                show:true,
                class: "alert-success"
            });
    }

    warning(message: string){
        this.setWarning(message);
    }
    setWarning(message: string) {
        let that = this;
        this.subject.next(
            { 
                type: "warning",
                text: message,
                show:true,
                class: "alert-warning"
            });
    }

    error(message: string){
        this.setError(message);
    }
    setError(message: string) {
        let that = this;
        this.subject.next(
            { 
                type: "error",
                text: message,
                show:true,
                class: "alert-danger"
            });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}