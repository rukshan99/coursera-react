import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, ListGroup } from 'reactstrap';

const DishDetailComponent = (props) => {
    return (
        <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

export default DishDetailComponent;