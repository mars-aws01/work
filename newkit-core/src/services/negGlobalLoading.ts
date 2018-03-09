import { Injectable } from '@angular/core';

@Injectable()
export class NegGlobalLoading {
  private loadingEl: HTMLDivElement;
  constructor() {
    this._init();
  }

  _init() {
    this.loadingEl = <HTMLDivElement>document.querySelector('#loading-target');
  }

  show(text?: string) {
    this.loadingEl.style.display = 'block';
    let loadingTextEl = this.loadingEl.querySelector('.loading-text');
    loadingTextEl && (loadingTextEl.innerHTML = text || '');
  }

  hide() {
    this.loadingEl.style.display = 'none';
  }
};
