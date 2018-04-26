import { patch } from "ultradom";
import { State, View} from "./builderSrc";

let element: Element;

export function render(view: View, state: State, rootElement?: Element | null): Element {
    element = patch(view(state), rootElement || element);
    return element;
}
