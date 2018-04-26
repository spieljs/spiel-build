import { h } from "ultradom";
import { IPage } from "./builderSrc";

export const page1: IPage = {
    state: {
        title: "page1",
    },

    view: (state: {title: string}) => {
        return(
            <div>
                <h1>{state.title}</h1>
            </div>
        );
    },
};

export const page2: IPage = {
    state: {
        title: "page2",
    },

    view: (state: {title: string}) => {
        return(
            <div>
                <h1>{state.title}</h1>
            </div>
        );
    },
};
