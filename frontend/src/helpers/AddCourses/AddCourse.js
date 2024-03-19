import React, { useState, useEffect } from "react";
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
import { Table } from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddCourse = () => {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTraining, setNewTraining] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "AWS" },
    { id: 2, name: "FSD" },
    { id: 3, name: "Flutter" },
  ]);

  useEffect(() => {
    // Mock fetch data from backend
    // Here, you may replace it with actual fetch request
    setTrainings(data);
    setIsLoading(false);
  }, []);

  const handleAdd = () => {
    if (newTraining.trim().length === 0) {
      alert("Please enter a valid name.");
      return;
    }

    if (
      data.some(
        (training) => training.name.toLowerCase() === newTraining.toLowerCase()
      )
    ) {
      alert("Name already exists.");
      return;
    }

    const newId = data.length + 1; // Generate a new ID for the training
    const newTrainingObj = { id: newId, name: newTraining };
    setData([...data, newTrainingObj]); // Update data with new training
    setNewTraining(""); // Clear the input field
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      const updatedTrainings = data.filter((training) => training.id !== id);
      setData(updatedTrainings);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Basic Tables" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Add New Technology</CardTitle>

                <Row className="justify-content-end">
                  <Col lg="10">
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="taskbudget"
                        className="col-form-label col-lg-2"
                      >
                        Enter Name
                      </Label>
                      <Col lg="10">
                        <Input
                          value={newTraining}
                          onChange={(e) => setNewTraining(e.target.value)}
                          id="taskbudget"
                          name="taskbudget"
                          type="text"
                          placeholder="Enter Name"
                          className="form-control"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg="2">
                    <Button onClick={handleAdd} color="primary">
                      Add
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="font-size-18">
                  <Row>
                    <Col lg="10">List of Existing Courses</Col>
                    <Col lg="2" className="d-flex justify-content-end">
                      <Button>Save</Button>
                    </Col>
                  </Row>
                </CardTitle>

                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Training Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="3">Loading...</td>
                        </tr>
                      ) : (
                        data.map((training, index) => (
                          <tr key={training.id}>
                            <td>{index + 1}</td>
                            <td>{training.name}</td>
                            <td>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDelete(training.id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddCourse;
