import React, { Component } from "react";
import { makeObservable, observable } from "mobx";
import { Nav, Tab, Row, Col }  from "react-bootstrap";
import { observer } from "mobx-react";
import TrainingContent from "./TrainingContent";
import RootStore from "../../../stores/RootStore";

class ITrainingPageProps {
    store: RootStore;
}

@observer
class TrainingPage extends Component<ITrainingPageProps> {
    filtersOpen: boolean;
    mainTag: number = 1;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            filtersOpen: observable,
            mainTag: observable
        });
    }

    renderMenu() {
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
                <Row>
                    <Col sm={2} style={{height: "160px"}}>
                        <Nav  variant="pills" className="flex-column">
                            <div className="container-fluid">
                                <Nav.Item key={1}>
                                    <div className="row" key={1}>
                                        <Nav.Link
                                            eventKey={1}
                                                className="nav-link lesson"
                                                onClick={() => this.changeMainTag(1)}>
                                                ГРАММАТИКА
                                            </Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item key={2}>
                                    <div className="row" key={2}>
                                            <Nav.Link
                                                eventKey={2}
                                                className="nav-link lesson"
                                                onClick={() => this.changeMainTag(2)}>
                                                ЧТЕНИЕ
                                            </Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item key={3}>
                                    <div className="row" key={3}>
                                            <Nav.Link
                                                eventKey={3}
                                                className="nav-link lesson"
                                                onClick={() => this.changeMainTag(3)}>
                                                АУДИРОВАНИЕ
                                            </Nav.Link>
                                    </div>
                                </Nav.Item>
                            </div>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <TrainingContent store={this.props.store} mainTag={this.mainTag}/>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }

    render() {
        return(
            <div className="container-fluid">
                 {this.renderMenu()}
            </div>
        );
    }

    changeMainTag(tagId: number) {
        this.mainTag = tagId;
    }
}

export default TrainingPage;