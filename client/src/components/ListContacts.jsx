import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Contact from "./Contact";

const ListContacts = () => {
  // this is my original state with an array of contacts
  const [contacts, setContacts] = useState([]);

  //   justkeep to avoid errors for now
  const [students, setStudents] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingStudent, setEditingStudent] = useState(null);

  const loadContacts = () => {
    // A function to fetch the list of students that will be load anytime that list change
    fetch("http://localhost:8080/api/contacts")
      .then((response) => response.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const onSaveStudent = (newStudent) => {
    //console.log(newStudent, "From the parent - List of Students");
    setStudents((students) => [...students, newStudent]);
  };

  //A function to control the update in the parent (student component)
  const updateStudent = (savedStudent) => {
    // console.log("Line 29 savedStudent", savedStudent);
    // This function should update the whole list of students -
    loadStudents();
  };

  //A function to handle the Delete funtionality
  const onDelete = (student) => {
    //console.log(student, "delete method")
    return fetch(`http://localhost:8080/api/students/${student.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadStudents();
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
        <h2>Techtonica Participants </h2>
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
      <MyForm
        key={editingStudent ? editingStudent.id : null}
        onSaveStudent={onSaveStudent}
        editingStudent={editingStudent}
        onUpdateStudent={updateStudent}
      />
    </div>
  );
};

export default ListContacts;
