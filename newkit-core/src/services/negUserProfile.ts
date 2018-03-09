import { Injectable } from '@angular/core';
import { NegAjax } from './../services/negAjax';

declare let NewkitConf: any;

@Injectable()
export class NegUserProfile {

  private _userId: string;
  private userProfile: Map<string, any> = new Map<string, any>();

  private get rootUrl() {
    return `${NewkitConf.APIGatewayAddress}/framework/v2/user-profile/${NewkitConf.DomainName}/${this._userId}`;
  }

  constructor(private negAjax: NegAjax) { }

  /**
   * Init User Profile
   * @param userId specify user
   */
  init(userId: string) {
    if (!userId) {
      throw new Error('Must provider userId');
    }
    this._userId = userId;
    return this.negAjax.get(this.rootUrl)
      .then(({ data }) => {
        data = data || [];
        data.forEach(item => {
          if (item.Key) {
            this.userProfile.set(item.Key, item);
          }
        });
      });
  }

  /**
   * Get user profile by key
   * @param key  Query key
   * @param force Force to get data from server
   */
  get(key: string, force: boolean = false): Promise<any> {
    let p;
    if (force || !this.userProfile.has(key)) {
      p = this.negAjax.get(`${this.rootUrl}/${key}`)
        .then(({ data }) => data);
    } else {
      p = Promise.resolve(this.userProfile.get(key));
    }
    return p.then(data => {
      return data ? data.Value : null;
    });
  }

  /**
   * Set single user profile.
   * @param key Profile key
   * @param value Profile value
   */
  set(key: string, value: any) {
    return this.negAjax.post(`${this.rootUrl}/${key}`, value)
      .then(() => {
        this.userProfile.set(key, {
          Key: key,
          Value: value
        });
        return Promise.resolve(true);
      });
  }

  /**
   * Remove single user profile by key
   * @param key Remove key
   */
  remove(key: string) {
    return this.negAjax.delete(`${this.rootUrl}/${key}`)
      .then(() => {
        if (this.userProfile.has(key)) {
          this.userProfile.delete(key);
        }
        return Promise.resolve(true);
      });
  }
}
