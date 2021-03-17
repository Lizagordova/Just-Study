import React, { Component } from "react";
import { makeObservable, observable } from "mobx";
import { Nav, Tab, Row, Col }  from "react-bootstrap";
import { observer } from "mobx-react";
import TrainingContent from "./TrainingContent";
import RootStore from "../../../stores/RootStore";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { Button } from "reactstrap";
import AddTagWindow from "../../Admin/Tags/AddTagWindow";
import { UserRole } from "../../../Typings/enums/UserRole";

class ITrainingPageProps {
    store: RootStore;
}

@observer
class TrainingPage extends Component<ITrainingPageProps> {
    filtersOpen: boolean;
    mainTag: number = 1;
    addTagWindowOpen: boolean;

    constructor(props: ITrainingPageProps) {
        super(props);
        makeObservable(this, {
            filtersOpen: observable,
            mainTag: observable,
            addTagWindowOpen: observable
        });
    }

    renderAddTagButton() {
        return (
            <Button
                onClick={() => this.toggleAddTagWindow()}>
                Добавить тег
            </Button>
        );
    }

    renderMenu(tags: TagViewModel[]) {
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
                <Row>
                    <Col sm={2} style={{height: "160px"}}>
                        <Nav  variant="pills" className="flex-column">
                            <div className="container-fluid">
                                {tags.map(t => {
                                    return (
                                        <Nav.Item key={t.id}>
                                            <div className="row" key={1}>
                                                <Nav.Link
                                                    eventKey={1}
                                                    className="nav-link lesson"
                                                    onClick={() => this.changeMainTag(t.id)}>
                                                    {t.name}
                                                </Nav.Link>
                                            </div>
                                        </Nav.Item>
                                    );
                                })}
                            </div>
                        </Nav>
                        {this.renderAddTagButton()}
                    </Col>
                    <Col sm={10}>
                        <TrainingContent store={this.props.store} mainTag={this.mainTag}/>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }

    renderAddTagWindow() {
        if(this.props.store.userStore.choosenUser.role !== UserRole.Admin) {
            return (
                <>
                    {this.addTagWindowOpen && <AddTagWindow tagStore={this.props.tag} toggle={this.toggleAddTagWindow} />}
                </>
            );
        }
    }

    render() {
        return(
            <div className="container-fluid">
                 {this.renderMenu(this.props.store.tagStore.tags)}
                {this.renderAddTagWindow()}
            </div>
        );
    }

    changeMainTag(tagId: number) {
        this.mainTag = tagId;
    }

    toggleAddTagWindow = () => {
        this.addTagWindowOpen = !this.addTagWindowOpen;
    }
}

export default TrainingPage;