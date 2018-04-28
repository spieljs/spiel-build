import Navigo = require("navigo");
import {IRoutes, Params} from "./interfaces";

export class Router {
    public router: Navigo;

    /**
     *
     * @param root the domain server
     * @param useHash if you want use hash in the router
     * @param hash hash to use
     */
    constructor(root?: string, useHash?: boolean, hash?: string) {
        this.router = new Navigo(root || null, useHash || false, hash || "#");
        return this;
    }

    /**
     * @param routes array with every route
     * @param builder the function to build the page of every route
     * @param parentPath the route parent path
     * @param rootElement the parent dom element where every route builds its page dom structure
     * @param extraParams Additional Params to allow add features to builder
     */
    public build<Route extends IRoutes>(routes: Route[],
                                        builder: (route: Route, params: Params, query: string,
                                                  rootElement?: Element, extraParams?: any) => void,
                                        parentPath?: string | null,
                                        rootElement?: Element,
                                        extraParams?: any) {
        routes.forEach((route) => {
            if (parentPath) {
                route.path = `${parentPath}${route.path}`;
            }

            if (route.alias) {
                this.router.on(route.path, {
                    as: route.alias, uses: (params, query) => {
                        builder(route, params, query, rootElement, extraParams);
                    },
                }, route.hooks);
            } else {
                this.router.on(route.path, (params, query) => {
                    builder(route, params, query, rootElement, extraParams);
                }, route.hooks);
            }

            if (route.routes) {
                this.build(route.routes, builder, route.path, rootElement, extraParams);
            }
        });
    }
}
