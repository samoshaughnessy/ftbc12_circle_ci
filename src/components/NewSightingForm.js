import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { BACKEND_URL } from "../constants";

const NewSightingForm = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "date":
        setDate(event.target.value);
        break;
      case "location":
        setLocation(event.target.value);
        break;
      case "notes":
        setNotes(event.target.value);
        break;
      default:
    }
  };

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleSubmit = (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();

    // Extract only category IDs to send to backend
    const selectedCategoryIds = selectedCategories.map(({ value }) => value);

    // Send request to create new sighting in backend
    axios
      .post(`${BACKEND_URL}/sightings`, {
        date,
        location,
        selectedCategoryIds,
        notes,
      })
      .then((res) => {
        // Clear form state
        setDate("");
        setLocation("");
        setSelectedCategories([]);
        setNotes("");

        // Navigate to sighting-specific page after submitting form
        navigate(`/sightings/${res.data.id}`);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Date and Time</Form.Label>
        <Form.Control
          // datetime-local input type allows user to input both date and time
          type="datetime-local"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          When did this sighting happen?
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Yishun, Singapore"
        />
        <Form.Text className="text-muted">
          Where did this sighting happen?
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <Select
          isMulti
          styles={selectFieldStyles}
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          // Use textarea to give user more space to type
          as="textarea"
          name="notes"
          value={notes}
          onChange={handleChange}
          placeholder="Big bear, bigger than human, walking around the park at night. Very scary."
        />
        <Form.Text className="text-muted">
          Please describe this sighting.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewSightingForm;
