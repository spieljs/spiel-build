import { assert, expect} from "chai";
import { Router } from "../src";
import { exampleBuilder } from "./builderSrc";
import { configRouter } from "./routerMock";

describe("Builder", () => {
    before(() => {
        exampleBuilder.setRouters(configRouter);
    });

    it("has to go to page1", (done) => {
        exampleBuilder.builder.router.navigate("/page1");
        setTimeout(() => {
            const title = document.getElementsByTagName("h1")[0];
            expect(title.textContent).has.to.be.equal("page1 Hello World");
            done();
        }, 100);
    });

    it("has to go to page2", (done) => {
        exampleBuilder.builder.router.navigate("/page2");
        setTimeout(() => {
            const title = document.getElementsByTagName("h1")[0];
            expect(title.textContent).has.to.be.equal("page2 Hello World");
            done();
        }, 100);
    });

    it("has to go to page3", (done) => {
        exampleBuilder.builder.router.navigate("/page2/page3");
        setTimeout(() => {
            const title = document.getElementsByTagName("h1")[0];
            expect(title.textContent).has.to.be.equal("page3 Hello World");
            done();
        }, 100);
    });
});
