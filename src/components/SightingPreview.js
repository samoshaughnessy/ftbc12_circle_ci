import React from "react";
import Card from "react-bootstrap/Card";

const SightingPreview = (props) => {
  console.log(props.data);
  const categoryNames = props.data.categories.map((category) => category.name);
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {`${new Date(props.data.date).toDateString()} 
          | ${props.data.location}`}
        </Card.Title>
        {categoryNames.length > 0 && (
          <Card.Text>Categories: {categoryNames.join(", ")}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
