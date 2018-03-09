import { ActivatedRoute } from '@angular/router';
export declare class NegUtil {
    private activatedRoute;
    private window;
    saveAs: Function;
    encodeBase64: Function;
    constructor(activatedRoute: ActivatedRoute);
    encodeUri(text: string): string;
    decodeUri(text: string): string;
    escape(text: string): string;
    unescape(text: string): string;
    /**
     * Get query string.
     * @param  {string} key? If key exists, return this key value; else, return all query object.
     */
    getQuery(key?: string): any;
    /**
     * Get base url by window.location
     * @param  {any} location
     */
    getBaseUrl(location: any): string;
    /**
     * Add watcher to object property changed.
     * @param  {{}} obj The object that add watcher.
     * @param  {string} property The property that watched.
     * @param  {Function} watherFn Property changed callback.
     * @param  {} defaultVal The default value for property.
     */
    addWatcher(obj: {}, property: string, watherFn: Function, defaultVal: any): void;
    /**
     * Remove item from Array(=== judge)
     * @param  {Array<any>} arr
     * @param  {any} item
     */
    remove(arr: Array<any>, item: any): void;
    /**
     * Generate UUID
     */
    generateUUID(): any;
    /**
     * Get current module name
     */
    getModuleName(): string;
    resetObject(obj: object): void;
    downloadFile(fileUrl: string, fileName?: string): void;
    /**
     * Get current route params
     */
    getRouteParams(): any;
    /**
     * Get current route queryParams
     */
    getRouteQueryParams(): any;
    /**
     * Get current route data
     */
    getRouteData(): any;
    /**
     * Get current route fragment
     */
    getRouteFragments(): any;
    private _getCurrentRouteParams(type);
}
