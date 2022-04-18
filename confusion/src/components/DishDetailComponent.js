import React, { Component } from 'react';
import {
    Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return (
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row>
                    <Label htmlFor="name" md={2}>Rating</Label>
                </Row>
                <Row className="form-group">
                    <Col md={10}>
                        <Control.select model=".rating" name="rating"
                            className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor="name" md={4}>Your Name</Label>
                </Row>
                <Row className="form-group">
                    <Col md={10}>
                        <Control.text model=".name" id="name" name="name"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                                minLength: minLength(3), maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                                minLength: 'Must be greater than 2 characters ',
                                maxLength: 'Must be 15 characters or less'
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor="comment" md={2}>Comment</Label>
                </Row>
                <Row className="form-group">
                    <Col md={10}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={{ size: 10 }}>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        );
    }
}

const renderDish = (dish) => {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const renderComments = (comments) => {
    const commentList = comments.map((comment, i) => {
        return (
            <li key={i}>
                {comment.comment} <br />
                --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
            </li>
        );
    });
    return (
        <React.Fragment>
            <h4>Comments</h4>
            <ul className="list-unstyled">{commentList}</ul>
        </React.Fragment>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {renderComments(this.props.comments)}
                            <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <CommentForm dishId={this.props.dish.id} addComment={this.props.addComment} />
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
}

export default DishDetail;