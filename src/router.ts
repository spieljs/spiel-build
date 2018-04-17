import Navigo = require("navigo");
import {IRoutes} from "./interfaces";

class Router {
    private router: Navigo;

    constructor(root: string, useHash: boolean, hash: string) {
        this.router = new Navigo(root || null, useHash, hash);
    }

    build<Route extends IRoutes>(Routes: Route[],
                                                builder: (route: Route, params: object, query:string) => void,
                                                parentPath?: string) {
        Routes.forEach(route => {
            if (parentPath) {
                route.path = `${parentPath}${route.path}`;
            }

            if (route.alias) {
                this.router.on(route.path, {
                    as: route.alias, uses: (params, query) => {
                        builder(route, params, query);
                    },
                }, route.hooks);
            } else {
                this.router.on(route.path, (params, query) => {
                    builder(route, params, query);
                }, route.hooks);
            }

            if(route.routes) {
                this.build(route.routes, builder, route.path);
            }
        });
    }
}   
