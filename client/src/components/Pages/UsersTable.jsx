import { useEffect, useState } from 'react';
import Hero from "../BodyParts/Hero";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (userId) => {
    fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'User deleted successfully') {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };


  const enterEditMode = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
  };

  const saveRole = (userId) => {
    fetch(`http://localhost:3000/api/users/${userId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Role updated successfully') {
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.id === userId ? { ...user, role: newRole } : user
            )
          );
          setEditingUserId(null);
        }
      })
      .catch(error => console.error('Error updating role:', error));
  };

  return (
    <>
      <Hero name="Users" />

      <div className="container-fluid p-5">
        <div className="mb-5 text-center">
          <h5 className="text-primary text-uppercase">Ours</h5>
          <h1 className="display-3 text-uppercase mb-0">Users and workers</h1>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Profile Picture</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    {user.profilePicture ? (
                      <img
                        src={`http://localhost:3000${user.profilePicture}`}
                        alt="Profile"
                        style={{ width: '100px', height: '70px'}}
                      />
                    ) : (
                      'No picture'
                    )}
                  </td>
                  <td>{user.fname}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="worker">Worker</option>
                        <option value="boss">Boss</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>

                  <td>
                    {editingUserId === user.id ? (
                      <>
                        <button
                          className="btn btn-success button-spacing"
                          onClick={() => saveRole(user.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingUserId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary button-spacing"
                          onClick={() => enterEditMode(user.id, user.role)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
