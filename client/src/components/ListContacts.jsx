import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import CreateContact from "./CreateContact";
import Contact from "./Contact";

const ListContacts = () => {
  // this is my original state with an array of contacts
  const [contacts, setContacts] = useState([]);

  //   justkeep to avoid errors for now
  const [students, setStudents] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingStudent, setEditingStudent] = useState(null);

  //   needed to do update request
  const [editingContact, setEditingContact] = useState(null);

  // A function to fetch the list of contacts that will be load anytime that list change
  const loadContacts = () => {
    fetch("http://localhost:8080/api/contacts")
      .then((response) => response.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const onSaveContact = (newContact) => {
    //console.log(newStudent, "From the parent - List of Students");
    setContacts((contacts) => [...contacts, newContact]);
  };

  //A function to control the update in the parent (student component)
  const updateStudent = (savedStudent) => {
    // console.log("Line 29 savedStudent", savedStudent);
    // This function should update the whole list of students -
    loadStudents();
  };

  //A function to handle the Delete funtionality
  const onDelete = (contact) => {
    //console.log(student, "delete method")
    return fetch(`http://localhost:8080/api/contact/${contact.contact_id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      //console.log(response);
      if (response.ok) {
        loadContacts();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateStudent) => {
    //console.log(toUpdateStudent);
    setEditingStudent(toUpdateStudent);
  };

  return (
    <div className="mybody">
      <div className="list-students">
        <h2>My Contacts </h2>
        <ul>
          {contacts.map((contact) => {
            return (
              <li key={contact.contact_id}>
                <Contact
                  contact={contact}
                  toDelete={onDelete}
                  toUpdate={onUpdate}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <CreateContact
        key={editingStudent ? editingStudent.id : null}
        onSaveContact={onSaveContact}
        editingStudent={editingStudent}
        editingContact={editingContact}
        onUpdateStudent={updateStudent}
      />
    </div>
  );
};

export default ListContacts;
