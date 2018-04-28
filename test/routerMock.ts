import { exampleBuilder, IConfigRouter} from "./builderSrc";
import { page1, page2, page3} from "./templateMocks";

export const configRouter: IConfigRouter = {
    defaultProps: "Hello World",
    rootPath: "http://localhost:9876",
    routes: [
        {
            page: page1,
            path: "/page1",
        },
        {
            page: page2,
            path: "/page2",
            routes: [{
                page: page3,
                path: "/page3",
            }],
        }],
};
