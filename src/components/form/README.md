**Tips**

`Please follow the demo code to build your form, include the html class and the structure`

**Usage**
```html
<form novalidate class="nk-form" #form="ngForm" (ngSubmit)="submitForm(form)" [class.ng-submitted]="form.submitted">
  <div class="nk-form-item">
    <label class="nk-form-item-label">Company:</label>
    <div class="nk-form-item-content">
      <input type="text" name="Company" [(ngModel)]="data1.Company" #comCtrl="ngModel" required minlength="2" />
      <ng-container *ngIf="form.submitted">
        <nk-validator [control]="comCtrl" [errorMsg]="{required: 'Company is required', minlength: 'The company length cannot be less then {0}'}"></nk-validator>
      </ng-container>
    </div>
  </div>
  <div>
    <button mode="submit" class="nk-button nk-button-primary">Save</button>
  </div>
</form>
```
