import React, {Component} from "react";
import {makeObservable, observable} from "mobx";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {observer} from "mobx-react";
import TrainingContent from "./TrainingContent";
import RootStore from "../../../stores/RootStore";
import {TagViewModel} from "../../../Typings/viewModels/TagViewModel";
import {Alert, Button} from "reactstrap";
import AddTagWindow from "../../Admin/Tags/AddTagWindow";
import {UserRole} from "../../../Typings/enums/UserRole";
import {isThatUserRole} from "../../../functions/isThatUserRole";

class ITrainingPageProps {
    store: RootStore;
}

@observer
class TrainingPage extends Component<ITrainingPageProps> {
    filtersOpen: boolean;
    mainTag: number = 0;
    addTagWindowOpen: boolean;
    notDeleted: boolean;

    constructor(props: ITrainingPageProps) {
        super(props);
        makeObservable(this, {
            filtersOpen: observable,
            mainTag: observable,
            addTagWindowOpen: observable,
            notDeleted: observable
        });
        this.setMainTag();
    }

    setMainTag() {
        let mainTag = this.props.store.tagStore.tags[0];
        if(mainTag !== undefined) {
            this.mainTag = mainTag.id;
        }
    }

    renderCautions() {
        return (
            <>
                {this.notDeleted && <Alert>Что-то пошло не так, и тег не удалился</Alert>}
            </>
        );
    }

    renderAddTagButton() {
        if(isThatUserRole(this.props.store.userStore, UserRole.Admin)) {
            return (
                <Button
                    onClick={() => this.toggleAddTagWindow()}>
                    Добавить тег
                </Button>
            );
        }
    }

    renderDeleteButton(tagId: number) {
        if(isThatUserRole(this.props.store.userStore, UserRole.Admin)) {
            return (
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.deleteTag(tagId)}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>

            );
        }
    }

    renderMenu(tags: TagViewModel[]) {
        let rowHeight = tags.length * 80 + 100;
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
                <Row>
                    <Col sm={2} style={{height: `${rowHeight}px`}}>
                        <Nav variant="pills" className="flex-column">
                            <div className="container-fluid">
                                {tags.map(t => {
                                    return (
                                        <Nav.Item key={t.id}>
                                            {this.renderDeleteButton(t.id)}
                                            <div className="row" key={t.id}>
                                                 <Nav.Link
                                                    eventKey={t.id}
                                                    className="nav-link lesson"
                                                    onClick={() => this.changeMainTag(t.id)}>
                                                    {t.name}
                                                </Nav.Link>
                                            </div>
                                        </Nav.Item>
                                    );
                                })}
                                {this.renderAddTagButton()}
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

    renderAddTagWindow() {
        return (
            <>
                {this.addTagWindowOpen && <AddTagWindow tagStore={this.props.store.tagStore} toggle={this.toggleAddTagWindow} />}
            </>
        );
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
    };

    deleteTag(tagId: number) {
        let result = window.confirm('Вы уверены, что хотите удалить этот тег?');
        if(result) {
            this.props.store.tagStore.deleteTag(tagId)
                .then((status) => {
                    this.notDeleted = status !== 200;
                });
        }
    }
}

export default TrainingPage;