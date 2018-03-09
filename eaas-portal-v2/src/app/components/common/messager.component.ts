 import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
 import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 import { MessagerService } from "../../services/common/messager.service";
 @Component({
    //moduleId: module.id,
    selector: 'messager',
    templateUrl: 'messager.component.html',

})
 export class MessagerComponent {
   modalRef: BsModalRef;
   message: any = {};
   title: string;
   config = {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false
    };
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

    constructor(
      private messagerService: MessagerService,
      private modalService: BsModalService
   ) { }
   
   ngOnInit() {
    //this function waits for a message from alert service, it gets 
    //triggered when we call this from any other component
    this.messagerService.getMessage().subscribe(message => {
        this.message = message;
        if(this.message.type=="confirm"){
          this.modalRef = this.modalService.show(this.modalTemplate, Object.assign({}, this.config, {class: 'gray modal-lg'}))
        }
        else if(this.modalRef && this.message.type!="confirm"){
          this.modalRef.hide();
        }

        if(this.message.type=='info' || this.message.type=='error'
           || this.message.type=='success' || this.message.type=='warning')
           {
             setTimeout(()=>{
               this.message.show = false;
             }, 5000);
           }
    });
  }

  setClass(): any{
    // let classes = {
    //   'alert-info':this.message.type=='info',
    //   'alert-danger':this.message.type=='error',
    //   'alert-success':this.message.type=='success',
    //   'alert-warning':this.message.type=='warning',
    // }
    let classes = {
      'messager-info':this.message.type=='info',
      'messager-error':this.message.type=='error',
      'messager-success':this.message.type=='success',
      'messager-warning':this.message.type=='warning',
    }

    return classes;
  }

  hideMessage(){
    this.message.show = false;
  }
}