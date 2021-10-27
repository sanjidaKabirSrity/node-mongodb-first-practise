import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users , setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

    //  DELETE AN USER 
    const handleUserDelete = id => {
        /* // without confirm
        fetch(`http://localhost:5000/users/${id}` , {
            method:'DELETE',
        }).then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                alert('Deleted successfully');
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            }
        }) */

        // with confirm 
        const proceed = window.confirm('Are you sure , you want to delete!');
        if(proceed){
            fetch(`http://localhost:5000/users/${id}` , {
            method:'DELETE',
            }).then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    alert('Deleted successfully');
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                }
            })
        }
    }

    return (
        <div>
            <h2>Users Available : {users.length}</h2>
            <ul>
                {
                    users.map(user=> <li key={user._id}>
                        <h4>{user.name} :- {user.email}</h4>
                        <Link to={`/users/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleUserDelete(user._id)}>Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;