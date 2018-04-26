import { h, patch, VNode } from "ultradom";
import { IRoutes, Router } from "../src";
import { render } from "./render";

export type Keys = string;
export type State = {[k in Keys]: any};
export type View = (state: any) => VNode<any>;

export interface IPage {
    state: State;
    view: View;
}

export interface IRoutesExample extends IRoutes {
    page: IPage;
}

export interface IConfigRouter {
    rootPath?: string;
    root?: string;
    useHash?: boolean;
    hash?: string;
    routes?: Array<{[Route in keyof IRoutesExample] : any}>;
}

export class ExampleBuilder {
    public builder!: Router;
    private configRouter!: IConfigRouter;
    private root!: string;

    public setRouters(configRouter: IConfigRouter) {
        this.configRouter = configRouter || {};
        this.root = configRouter.root || "app";
        this.builder = new Router(configRouter.rootPath, configRouter.useHash, configRouter.hash);
        const element = this.createRootElement();

        if (configRouter.routes) {
            this.builder.build(configRouter.routes, this.setPatch, null, element);
        }

        this.builder.router.resolve();
    }

    private createRootElement() {
        const rootElement = document.getElementById(this.root);
        const node = h("div", {});
        let element;
        if (!rootElement) {
            const elm = document.createElement("div");
            elm.setAttribute("id", this.root);
            document.body.appendChild(elm);
            element = patch(node, document.getElementById(this.root));
        } else {
            element = patch(node, document.getElementById(this.root));
        }

        return element;
    }

    private setPatch(route: IRoutesExample, params: object, query: string, rootElement?: Element) {
        const page = route.page;
        const state: State = {};

        Object.assign(state, page.state);
        state.params = params;
        state.query = query;
        render(page.view, state, rootElement);
    }
}

export const exampleBuilder = new ExampleBuilder();
