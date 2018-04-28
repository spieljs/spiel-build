import { h } from "ultradom";
import { IPage } from "./builderSrc";

export const page1: IPage = {
    state: {
        title: "page1",
    },

    view: (state: {title: string, defaultProps: string}) => {
        return(
            <div>
                <h1>{state.title} {state.defaultProps}</h1>
            </div>
        );
    },
};

export const page2: IPage = {
    state: {
        title: "page2",
    },

    view: (state: {title: string, defaultProps: string}) => {
        return(
            <div>
                <h1>{state.title} {state.defaultProps}</h1>
            </div>
        );
    },
};

export const page3: IPage = {
    state: {
        title: "page3",
    },

    view: (state: {title: string, defaultProps: string}) => {
        return(
            <div>
                <h1>{state.title} {state.defaultProps}</h1>
            </div>
        );
    },
};
