import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

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

const renderComments = (dish) => {
    const comments = dish.comments;
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

const DishDetailComponent = (props) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {renderDish(props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {renderComments(props.dish)}
                </div>
            </div>
        </div>
    );
}

export default DishDetailComponent;