import * as m from "mithril"
import {ContentAttrs} from '~/content'

const TriStatus: m.Component = {
    view: (vnode) => {
        const {model, actions} = vnode.attrs as ContentAttrs
        return m("div", {id: "status-bar-holder"}, [
            m("span", {id: "tridactyl-status-left"}),
            m("span", {id: "tridactyl-status-middle"}),
            m("span", {id: "tridactyl-status-right"}),
        ]);
    }
};

export default TriStatus
