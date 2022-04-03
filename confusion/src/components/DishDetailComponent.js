DishDetailComponent = (props) => {
    return (
        <Card>
            <CardImg top src={props.dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

export default DishDetailComponent;