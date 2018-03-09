import { NegAjax } from './negAjax';
import { NegStorage } from './negStorage';
export declare class NegAuth {
    private negAjax;
    private negStorage;
    private _authData;
    private _userProfile;
    private _authorizedUrls;
    private _isAuthenticated;
    private _noPermissionMenus;
    constructor(negAjax: NegAjax, negStorage: NegStorage);
    setAuthData(authData: any): void;
    private _processAuthDataForNoPermissionMenus(menus, unauthorized?);
    canVisitUrl(url: string): boolean;
    setAuthorizedUrls(authorizedUrls: any): void;
    readonly authData: any;
    readonly user: any;
    readonly userId: any;
    readonly displayName: any;
    readonly newkitToken: any;
    isAuthenticated(): boolean;
    isAuthorizedPath(path: string): boolean;
    /**
     * 通过AppId获取token
     * @param  {number} appId
     * @returns Promise
     */
    getOAuthToken(appId: any): Promise<any>;
    /**
     * 通过用户ID获取token
     */
    getTokenByWithRole(): Promise<any>;
    /**
     * 检查用户权限
     * @param  {string} appId AppId
     * @param  {string} functionName 权限名称
     * @returns boolean
     */
    hasFunction(appId: string, functionName: string): boolean;
    /**
     * 检查用户权限
     * @param  {string} appName app名称
     * @param  {string} functionName 权限名称
     * @returns boolean
     */
    hasFunctionByAppName(appName: string, functionName: string): boolean;
    /**
     * 检查用户权限
     * @param  {string} functionName 权限名称
     * @returns boolean
     */
    hasFunctionByName(functionName: string): boolean;
}
