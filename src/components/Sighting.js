import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { BACKEND_URL } from "../constants.js";

const Sighting = () => {
  const [sightingId, setSightingId] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    // If there is a sightingId, retrieve the sighting data
    if (sightingId) {
      axios.get(`${BACKEND_URL}/sightings/${sightingId}`).then((response) => {
        setSighting(response.data);
      });
      axios
        .get(`${BACKEND_URL}/sightings/${sightingId}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    }
    // Only run this effect on change to sightingId
  }, [sightingId]);

  // Update sighting ID in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingId !== params.sightingId) {
    setSightingId(params.sightingId);
  }

  // Store a new JSX element for each property in sighting details
  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      // Special logic for rendering categories
      if (key === "categories") {
        // Only show categories label if there are any
        if (sighting[key].length > 0) {
          const categoryNames = sighting[key].map((category) => {
            console.log(category);
            return category.name;
          });
          sightingDetails.push(
            <Card.Text key={key}>{`${key}: ${categoryNames.join(
              ", "
            )}`}</Card.Text>
          );
        }
        continue;
      }
      // Logic for rendering non-category fields
      sightingDetails.push(
        <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
      );
    }
  }

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();

    // Send request to create new comment in backend
    axios
      .post(`${BACKEND_URL}/sightings/${sightingId}/comments`, {
        content: commentContent,
      })
      .then((res) => {
        // Clear form state
        setCommentContent("");

        // Refresh local comment list
        return axios.get(`${BACKEND_URL}/sightings/${sightingId}/comments`);
      })
      .then((response) => {
        setComments(response.data);
      });
  };

  // Store a new JSX element for each comment
  const commentElements = comments
    ? comments.map((comment) => (
        <ListGroup.Item key={comment.id}>
          {comment.createdAt} | {comment.content}
        </ListGroup.Item>
      ))
    : [];

  return (
    <div>
      <Link to="/">Home</Link>
      <Card>
        <Card.Body>{sightingDetails}</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control
            // Use textarea to give user more space to type
            as="textarea"
            name="content"
            value={commentContent}
            onChange={handleChange}
            placeholder="What a big bear!"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <ListGroup>{commentElements}</ListGroup>
      <br />
    </div>
  );
};

export default Sighting;
