import { NegAuth } from './negAuth';
export declare class NegDfisUploader {
    private negAuth;
    constructor(negAuth: NegAuth);
    _upload(dfisUrl: string, file: Blob | File, headers?: {}): Promise<any>;
    /**
     * 上传文件到dfis
     * @param  {string} dfisUrl - 要上传的地址（Dfis完整上传地址）
     * @param  {Blob|File} file - 要上传的内容
     */
    upload(dfisUrl: string, file: Blob | File): Promise<any>;
    /**
     * 上传文件到dfis
     * @param  {string} dfisUrl - 要上传的地址（Dfis完整上传地址）
     * @param  {Blob|File} file - 要上传的内容
     */
    uploadForLL(dfisUrl: string, file: Blob | File): Promise<any>;
}
