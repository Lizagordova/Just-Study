import React, { Component } from "react";
import {UserStore} from "../stores/UserStore";

class Menu extends Component<{store: UserStore}> {
    constructor(props: {store : UserStore}) {
        super(props);
    }

    render() {
        return(
            <>
                Hello worlds {this.props.store.user.firstName}
            </>
        )
    }
}

export default Menu;