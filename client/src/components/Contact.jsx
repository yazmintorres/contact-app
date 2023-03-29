import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const Contact = ({ contact, toUpdate, toDelete }) => {
  const onUpdate = (toUpdateStudent) => {
    toUpdate(toUpdateStudent);
  };

  const onDelete = (toDeleteStudent) => {
    toDelete(toDeleteStudent);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {contact.firstname} {contact.lastname}
        </Card.Title>
        <Button
          variant="outline-danger"
          onClick={() => {
            onDelete(contact);
          }}
          style={{ padding: "0.6em", marginRight: "0.9em" }}
        >
          <ioicons.IoTrash />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            onUpdate(contact);
          }}
          style={{ padding: "0.6em" }}
        >
          {" "}
          <ioicons.IoSync />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Contact;
