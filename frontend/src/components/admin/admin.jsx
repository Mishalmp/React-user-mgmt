import Menubar from "../Navbar/Navbar";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getLocal } from '../../healpers/auth';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../api/api';
import jwt_decode from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


function Admin() {
  const token = getLocal();
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  

  async function getUserlist() {
    const request = await axios.get(`${baseUrl}user-list/`);
    setUsers(request.data);
  }

  useEffect(() => {
    const decoded = jwt_decode(token);
    if (!decoded || !decoded.is_admin) {
      history('/');
    } else {
      getUserlist();
    }
  }, [history, token]);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !password1) {
      alert('Fields cannot be blank');
      return;
    }

    if (password !== password1) {
      alert("Password doesn't match");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}user-register/`,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        getUserlist();
        history('/admin');
      } else {
        alert(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (index, e) => {
    e.preventDefault();
    const user = users[index];
  
    // Get the updated values from the state
    const updatedUsername = username || user.username;
    const updatedEmail = email || user.email;
    const updatedPassword = password || user.password;
    
  
    // Validate if any field is changed
    if (user.username === updatedUsername && user.email === updatedEmail && !updatedPassword) {
      alert('No changes made.');
      return;
    }
    
  
    try {
      const response = await axios.put(
        `${baseUrl}user-detail/${user.id}/`,
        {
          username: updatedUsername,
          email: updatedEmail,
          password: updatedPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        getUserlist();
        history('/admin');
      } else {
        alert(`Error: ${response.status}`);
      }
    } catch (error) {
    //   console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (confirmed) {
      try {
        await axios.delete(`${baseUrl}user-detail/${userId}/`);
        getUserlist();
      } catch (error) {
        console.error(error);
      }
    }
}

  const searchUser = async (keyword) => {
    if (keyword) {
      const request = await axios.get(`${baseUrl}user-list/?search=${keyword}`);
      setUsers(request.data);
    } else {
      getUserlist();
    }
  };

  return (
    <div>
      <Menubar heading={'Admin page'} />
      <div className="d-flex justify-content-end container-fluid">
        <button
          type="button"
          className="btn btn-warning me-3 my-3"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add User
        </button>
        <input
          type="text"
          className="form-control w-25 my-2 ms-auto"
          onChange={(e) => searchUser(e.target.value)}
          placeholder="Search here"
        />
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <Form onSubmit={handleAddUser}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add User
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div style={{ display: 'block', width: 470, padding: 20 }}>
                  <Form.Group className="py-2">
                    <Form.Control
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                  </Form.Group>
                  <Form.Group className="py-2">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group className="py-2">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group className="py-2">
                    <Form.Control
                      type="password"
                      name="password1"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
                  <Form.Group></Form.Group>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <Button variant="primary" className="my-4" type="submit">
                  Add User
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="card cards recent-sales overflow-auto mx-3">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Is active</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: '45px', height: '45px' }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{user.email}</p>
                  </td>
                  <td>
                    {user.is_active ? (
                      <MDBBadge color="primary" pill>
                        NO Active
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="success" pill>
                        Active
                      </MDBBadge>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target={`#exampleModal${index}`}
                    >
                      <i className="fas fa-edit" />
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${index}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <Form onSubmit={(e) => handleUpdateUser(index, e)}>
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">
                                Edit User
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Form.Group className="py-2">
                                <Form.Control
                                  type="text"
                                  name="username"
                                  placeholder="Username"
                                  defaultValue={user.username}
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="py-2">
                                <Form.Control
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  defaultValue={user.email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="py-2">
                                <Form.Control
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)} 
                                />
                              </Form.Group>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                              </button>
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger ms-1">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default Admin;
