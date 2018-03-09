import { ErrorHandler, Injectable, forwardRef, Injector, NgZone, ApplicationRef, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { NegMessageBox, NegBizLog } from '@newkit/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private ngZone: NgZone;
  private negMessageBox: NegMessageBox;
  private negBizLog: NegBizLog;

  constructor(
    private inj: Injector) {
  }

  handleError(error) {
    if (!isDevMode()) {
      this.ngZone = this.ngZone || this.inj.get(NgZone);
      this.negBizLog = this.negBizLog || this.inj.get(NegBizLog);
      this.ngZone.run(() => {
        this.negBizLog.log('app_exception', {
          message: error.message || error,
          stack: error.stack || null,
          url: location.href
        });
      });
    }
    throw error;
  }
}
