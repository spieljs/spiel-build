import Navigo = require("navigo");
import {IRoutes} from "./interfaces";

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

    public build<Route extends IRoutes>(routes: Route[],
                                        builder: (route: Route, params: object, query: string,
                                                  rootElement?: Element) => void,
                                        parentPath?: string | null,
                                        rootElement?: Element) {
        routes.forEach((route) => {
            if (parentPath) {
                route.path = `${parentPath}${route.path}`;
            }

            if (route.alias) {
                this.router.on(route.path, {
                    as: route.alias, uses: (params, query) => {
                        builder(route, params, query, rootElement);
                    },
                }, route.hooks);
            } else {
                this.router.on(route.path, (params, query) => {
                    builder(route, params, query, rootElement);
                }, route.hooks);
            }

            if (route.routes) {
                this.build(route.routes, builder, route.path, rootElement);
            }
        });
    }
}
