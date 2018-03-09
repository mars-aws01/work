import './feedback.styl';

import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NegDfisUploader, NegAuth, NegAlert, NegAjax } from '@newkit/core';

@Component({
  selector: 'nk-feedback',
  templateUrl: './feedback.html'
})

export class FeedbackComponent {

  @ViewChild('feedbackModal') feedbackModal: ElementRef;
  private $feedbackModal: any;

  @Input()
  get shown(): boolean {
    return this._shown;
  }
  set shown(value: boolean) {
    this._shown = value;
    if (!this.$feedbackModal) return;
    value ? this.showFeedback(true) : this.hideFeedbackModal(true);
  }
  private _shown: boolean;

  @Output() shownChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  feedbackInfo: any;
  feedbackSubmitted: boolean;
  screenshoting: boolean;

  constructor(
    private negDfisUploader: NegDfisUploader,
    private negAuth: NegAuth,
    private negAlert: NegAlert,
    private negAjax: NegAjax) {

  }

  ngOnInit() {
    this.onFeedbackShown = this.onFeedbackShown.bind(this);
  }

  ngAfterViewInit() {
    this.$feedbackModal = window['jQuery'](this.feedbackModal.nativeElement);
    this.$feedbackModal.on('shown.bs.modal', this.onFeedbackShown);

    if (this.shown) {
      setTimeout(() => {
        this.showFeedback(true);
      }, 100);
    }
  }

  ngOnDestroy() {
    this.feedbackInfo = null;
    if (this.$feedbackModal) {
      this.hideFeedbackModal(true);
      setTimeout(() => {
        this.$feedbackModal.off('shown.bs.modal', this.onFeedbackShown);
        this.$feedbackModal.data('bs.modal', null);
        this.$feedbackModal = null;
        this.feedbackModal = null;
      });
    }
  }

  public showFeedback(noEmit: boolean = false) {
    this.feedbackSubmitted = false;
    this.feedbackInfo = {
      Feedback: '',
      IncludeScreenshot: true,
      Screenshot: null,
      _canvas: null
    };
    this.screenshoting = true;
    this.$feedbackModal.modal('show');
    if (noEmit) return;
    this.shown = true;
    this.shownChange.emit(true);
  }

  onFeedbackShown(event) {
    jQuery('html,body').scrollTop(0);
    jQuery('.modal-backdrop').attr('data-html2canvas-ignore', true);
    window['html2canvas'](document.body, { useCORS: true })
      .then(canvas => {
        this.feedbackInfo._canvas = canvas;
        let base64Url = canvas.toDataURL();
        this.feedbackInfo.Screenshot = base64Url;
        this.screenshoting = false;
      });
  }

  hideFeedbackModal(noEmit: boolean = false) {
    this.$feedbackModal.modal('hide');
    if (noEmit) return;
    this._shown = false;
    setTimeout(() => {
      this.shownChange.emit(false);
    });
  }

  sendFeedback(form) {
    this.feedbackSubmitted = true;
    if (form.invalid) return;

    Promise.resolve(this.feedbackInfo.IncludeScreenshot)
      .then(includeImg => {
        if (includeImg) {
          return this.uploadImgToDfis(this.feedbackInfo._canvas);
        }
        return "";
      })
      .then(imgUrl => {
        let detail = {
          Feedback: this.feedbackInfo.Feedback,
          IncludeScreenshot: this.feedbackInfo.IncludeScreenshot,
          ImgUrl: imgUrl
        }
        let mailbody = this.buildMailBody(detail);
        return this.sendMail(mailbody);
      })
      .then(data => {
        this.negAlert.success('Send feedback successfully.');
        this.hideFeedbackModal();
      })
      .catch(err => this.negAlert.error(err.Message || err));
  }

  private uploadImgToDfis(canvas) {
    return new Promise((resolve, reject) => {
      let dfisUploadUrl = `http://neg-app-dfis:8200/newkit/attachment/neg_feedback_imgs_${Date.now()}.jpg`;
      if (canvas.toBlob) {
        canvas.toBlob(blob => {
          this.negDfisUploader.upload(dfisUploadUrl, blob)
            .then(res => {
              resolve(dfisUploadUrl);
            })
            .catch(err => reject('Upload image failed. Please try again.'));
        });
      } else {
        let blob = canvas.msToBlob();
        this.negDfisUploader.upload(dfisUploadUrl, blob)
          .then(res => {
            resolve(dfisUploadUrl);
          })
          .catch(err => reject('Upload image failed. Please try again.'));
      }
    });
  }

  private buildMailBody(feedbackDetail: any) {
    let currentUser = this.negAuth.user;
    let html = `<html>
      <head>
        <style>
          .t1 { background-color: green; color: white }
          table { border-collapse: collapse; }
          table, td, th { border: 1px solid black; padding: 5px 10px; }
          td.key { width: 200px; font-weight: bold; text-align: right; }
        </style>
      </head>
      <body style="font-family: Calibri; font-weight: normal; font-size: 11pt;">
        Dear Sir,<br /><br />
        <div style="margin-left: 20px">
          You have a new feedback from ${currentUser.FullName} <br />
          <h3>Content</h3>
          <div>${feedbackDetail.Feedback}</div>
          <br />
          <<screenshot>>
          <h3>User Info</h3>
          <table style="width: 90%; border-style: solid; border-width: 1px;">
            <tr><td class='key'>User</td><td>${currentUser.UserID}</td></tr>
            <tr><td class='key'>Department</td><td>${currentUser.Department}</td></tr>
            <tr><td class='key'>IpAddress</td><td>${currentUser.IpAddress}</td></tr>
            <tr><td class='key'>Date</td><td>${new Date()}</td></tr>
            <tr><td class='key'>URL</td><td>${location.href}</td></tr>
          </table>
          <br />
          <h3>Browser Info</h3>
          <table style="width: 90%; border-style: solid; border-width: 1px;">
            <tr><td class='key'>App Version</td><td>${navigator.appVersion}</td></tr>
            <tr><td class='key'>Language</td><td>${navigator.language}</td></tr>
            <tr><td class='key'>User Agent</td><td>${navigator.userAgent}</td></tr>
            <tr><td class='key'>Vendor</td><td>${navigator.vendor}</td></tr>
            <tr><td class='key'>Screen Width</td><td>${screen.width}</td></tr>
            <tr><td class='key'>Screen Height</td><td>${screen.height}</td></tr>
          </table>
        </div>
        <br />
        Best Regards
        <br />
      </body>
    </html>`
    if (feedbackDetail.IncludeScreenshot) {
      html = html.replace('<<screenshot>>', `
      <h3>Screenshot</h3>
      <a href="${feedbackDetail.ImgUrl}">
        <img src="${feedbackDetail.ImgUrl}" alt="Screenshot" />
      </a>
      <br />`);
    } else {
      html = html.replace('<<screenshot>>', '');
    }
    return html;
  }

  private sendMail(mailBody: any) {
    let currentUser = this.negAuth.user;
    let mailEntity = {
      From: currentUser.EmailAddress,
      To: NewkitConf.feedbackTo,
      Subject: '(#HostEnvironment#) Newkit feedback info',
      Body: mailBody,
      IsNeedLog: false,
      Priority: 'Normal',
      ContentType: 'html',
      MailType: 'Smtp',
      SmtpSetting: {
        SubjectEncoding: 'UTF8',
        BodyEncoding: 'UTF8'
      }
    };
    return this.negAjax.post(`${NewkitConf.APIGatewayAddress}/framework/v1/mail`, mailEntity)
  }
}
