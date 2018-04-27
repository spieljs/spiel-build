export type Keys = string;
export type Params = {[k in Keys]: any};

/**
 * Type for build router
 */
export type TBuild = <Route extends IRoutes>(routes: Route[],
                                             builder: (route: Route, params: object, query: string,
                                                       rootElement?: Element) => void,
                                             parentPath?: string | null,
                                             rootElement?: Element) => void;

export interface IGenericHooks {
    /** Before to resolve the route
     * @param done To execute when finish async operation with done()
     * @param params Params of the path,
     * @example: /user:id => params.id
     */
    before?(done: (suppress?: boolean) => void, params?: Params): void;
    /** After resolving
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    after?(params?: Params): void;
}

export interface IHooks {
    /** Before to resolve the route
     * @param done To execute when finish async operation with done()
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    before?(done: (suppress?: boolean) => void, params?: Params): void;
    /** After resolving
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    after?(params?: Params): void;
    /** When you are going out of the that route
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    leave?(params?: Params): void;
    already?(params?: Params): void;
}

export interface IRoutes {
    /** Alias route to allow generate an url
     * @since 0.3.3
     */
    alias?: string;
    /** Page component path */
    path: string;
    /**Assigns hooks for this route
     * @see <a href="_helpers_interfaces_.ihooks.html">IHooks</a>
     */
    hooks?: IHooks;
    /** Add page childreen
     * @see <a href="_helpers_interfaces_.irouters.html">IRouters</a>
     */
    routes?: any;
}
