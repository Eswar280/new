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

//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
const axiosAPI = axios.create();
const ExpenditureData = () => {
  const data = [
    {
      UploadTime: "",
      UploadDate: "", // Add UploadDate field
      name: "",
      description: "", // Corrected field name
      card: "",
      amount: "",
      date: "",
      file: "",
    },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [inputFields, setInputFields] = useState(data);

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
    const newItem = { name: "", file: "" };
    setInputFields([...inputFields, newItem]);
  };

  const handleRemoveFields = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  const handleSubmit = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${
      currentDate.getMinutes() < 10 ? "0" : ""
    }${currentDate.getMinutes()} ${currentDate.getHours() < 12 ? "am" : "pm"}`;

    const dataToSend = inputFields.map((field) => ({
      ...field,
      UploadDate: formattedDate,
      UploadTime: formattedTime,
    }));

    try {
      axiosAPI
        .post("http://localhost:5000/add/Expenditure", dataToSend)
        .then((res) => {
          if (res.status === 200) {
            alert("sent");
          } else {
            alert("not sent");
          }
        });
    } catch (err) {
      console.log(err);
      alert("Error occurred while sending data.");
    }
  };

  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Add New Expenditure</CardTitle>
                <form className="outer-repeater">
                  <div data-repeater-list="outer-group" className="outer">
                    <div data-repeater-item className="outer">
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Mentor
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="taskbudget"
                            type="text"
                            placeholder="Enter Mentor Name"
                            className="form-control"
                          />
                        </Col>
                      </FormGroup>
                      <div className="inner-repeater mb-4">
                        <div className="inner form-group mb-0 row">
                          <Label className="col-form-label col-lg-2">
                            Expenditure Details
                          </Label>
                          <div
                            className="inner col-lg-10 ml-md-auto"
                            id="repeater"
                          >
                            {inputFields.map((field, key) => (
                              <div
                                key={key}
                                className="mb-3 row align-items-center"
                              >
                                <FormGroup className="mb-4" row>
                                  <Col lg="10">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      name="name"
                                      type="text"
                                      className="form-control"
                                      placeholder="Expenditure Name"
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="mb-4" row>
                                  <Col lg="10">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      name="description"
                                      type="textarea"
                                      className="form-control"
                                      placeholder="Describe your expenditure"
                                    />
                                  </Col>
                                </FormGroup>
                                <Col md="2">
                                  <select
                                    className="form-control"
                                    name="card"
                                    onChange={(e) => handleChange(e, key)}
                                  >
                                    <option value="">Select Card</option>
                                    <option value="T-Hub Card">
                                      T-Hub Card
                                    </option>
                                    <option value="College Card">
                                      College Card
                                    </option>
                                    <option value="Accounts">Accounts</option>
                                  </select>
                                </Col>
                                <Col md="2">
                                  <div className="mt-4 mt-md-0">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      name="amount"
                                      placeholder="Amount"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </Col>
                                <Col md="2" className="pr-0 mt-1">
                                  <DatePicker
                                    className="form-control"
                                    selected={field.date}
                                    onChange={(date) =>
                                      handleDateChange(date, key)
                                    }
                                  />
                                </Col>
                                <Col md="4">
                                  <div className="mt-4 mt-md-0">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      type="file"
                                      name="file"
                                      className="form-control"
                                      defaultValue={field.file}
                                    />
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="mt-2 mt-md-0 d-grid">
                                    <Button
                                      color="primary"
                                      onClick={() => handleRemoveFields(key)}
                                      block
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </Col>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button color="success" onClick={handleAddFields}>
                              Add Expenditure
                            </Button>
                          </Col>
                        </Row>
                      </div>
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

export default ExpenditureData;