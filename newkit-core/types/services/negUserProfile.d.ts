import { NegAjax } from './../services/negAjax';
export declare class NegUserProfile {
    private negAjax;
    private _userId;
    private userProfile;
    private readonly rootUrl;
    constructor(negAjax: NegAjax);
    /**
     * Init User Profile
     * @param userId specify user
     */
    init(userId: string): Promise<void>;
    /**
     * Get user profile by key
     * @param key  Query key
     * @param force Force to get data from server
     */
    get(key: string, force?: boolean): Promise<any>;
    /**
     * Set single user profile.
     * @param key Profile key
     * @param value Profile value
     */
    set(key: string, value: any): Promise<boolean>;
    /**
     * Remove single user profile by key
     * @param key Remove key
     */
    remove(key: string): Promise<boolean>;
}
