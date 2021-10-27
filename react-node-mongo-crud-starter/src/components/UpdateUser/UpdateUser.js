import React , {useEffect , useState} from 'react';
import {useParams} from 'react-router';

const UpdateUser = () => {
    const {id} = useParams();
    const [user , setUser] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:5000/users/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    } , [])

    const handleNameChange = e => {
        const updateName = e.target.value;
        // const UpdateUser = {name:updateName, email:user?.email}
        const UpdateUser = {...user};
        UpdateUser.name = updateName;
        setUser(UpdateUser);
    }
    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        // const UpdateUser = {name:user?.name, email:updateEmail}
        const UpdateUser = {...user};
        UpdateUser.email = updateEmail;
        setUser(UpdateUser);
    }
    const handleUpdateUser = e => {
        fetch(`http://localhost:5000/users/${id}`, {
            method:'PUT',
            headers:{
                'content-type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.modifiedCount > 0){
                alert('Updated successfully');
                setUser('');
            }
        });

        e.preventDefault();
    }

    return (
        <div>
            <h2>Update {user?.name}</h2>
            <p> <small>{id}</small></p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user?.name || ''} />
                <input type="email" onChange={handleEmailChange} value={user?.email || ''} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default UpdateUser;