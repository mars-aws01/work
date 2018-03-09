export declare class NegFeedback {
    constructor();
    /**
     * 注册模块收件人
     * @param moduleName 模块名称
     * @param recipient 收件人
     */
    registerModule(moduleName: string, recipient: string): void;
    /**
     * 通过模块名称，获取动态设置的收件人
     * @param  {string} moduleName 模块名称
     */
    getModuleRecipient(moduleName: string): string;
}
