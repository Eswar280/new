import React, { useState } from "react";
import {
  Label,
  Input,
  FormGroup,
  Col,
  Row,
  Card,
  CardBody,
  Button,
  CardTitle,
} from "reactstrap";

// Import Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const axiosAPI = axios.create();

const AddTrainer = ({ Mentor }) => {
  const [inputFields, setInputFields] = useState([
    {
      Parent: "",
      Mentor: Mentor,
      name: "",
      description: "",
      card: "",
      amount: "",
      date: new Date(),
      file: "",
    },
  ]);

  const handleDateChange = (date, index) => {
    const fields = [...inputFields];
    fields[index]["date"] = date;
    setInputFields(fields);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const fields = [...inputFields];
    fields[index][name] = value;
    setInputFields(fields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        uploadTime: new Date().toLocaleTimeString(),
        uploadDate: new Date().toLocaleDateString(),
        Mentor: Mentor,
        name: "",
        discription: "",
        card: "",
        amount: "",
        date: new Date(),
        file: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  const handleSubmit = () => {
    console.log(inputFields);
    try {
      axiosAPI
        .post("http://localhost:5000/add/Expenditure", inputFields)
        .then((res) => {
          if (res.status === 200) {
            alert("Expenditure data sent successfully");
          } else {
            alert("Failed to send expenditure data");
          }
        });
    } catch (err) {
      console.log(err);
      alert("Error occurred while sending data");
    }
  };

  return (
    <>
      <div className="page-content">
        <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Add New Trainer</CardTitle>
                <form className="outer-repeater">
                  <div data-repeater-list="outer-group" className="outer">
                    <div data-repeater-item className="outer">
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Trainer Name
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="taskbudget"
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Trainer Id
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="taskbudget"
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Domain
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="taskbudget"
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                          />
                        </Col>
                      </FormGroup>
                    </div>
                  </div>
                </form>
                <Row className="justify-content-end">
                  <Col lg="10">
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddTrainer;
