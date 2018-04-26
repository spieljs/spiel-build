import { exampleBuilder, IConfigRouter} from "./builderSrc";
import { page1, page2 } from "./templateMocks";

export const configRouter: IConfigRouter = {
    rootPath: "http://localhost:9876",
    routes: [
        {
            page: page1,
            path: "/page1",
        },
        {
            page: page2,
            path: "/page2",
        }],
};
