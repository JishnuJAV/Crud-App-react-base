import React, { useState } from 'react';
import './userform.css';
import Axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

const UserForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [userlist, setUserlist] = useState([]);
    console.log(userlist)
    const [show, setShow] = useState(false);
    // const [newfname, setNewfname] = useState('');
    // const [newlname, setNewlname] = useState('');
    // const [newemail, setNewemail] = useState('');
    const [getItems, setGetItems] = useState([])
    const [getOnchage ,setOnchange] =useState({
        lastname:"",
        firstname:"",
        email:""
    })
  




    const getUserHandler = () => {
        Axios.get('http://localhost:4001/api/get')
            .then(res => {

                const users = res.data;
                const userData = users.data;
                // console.log("users=",users);
                // console.log("array =>", users.data);
                setUserlist(userData);
                console.log(userlist);
            })
    }

    const deleteUser = (email) => {
        console.log("inside deleteUser..!!")
        Axios.delete(`http://localhost:4001/api/delete/${email}`).then((res) => {
            setUserlist(
                userlist.filter((val) => {
                    return val.email !== email;
                })
            );
        });
    };

    const updateUser = (email) => {
        console.log("inside UpdateUser..!!")
        Axios.patch(`http://localhost:4001/api/update/${email}`, {
            getOnchage   
        // firstname: newfname,
            // lastname: newlname,
            // email: newemail
        }).then((res) => {
            console.log(res.data);
            setUserlist.map((val, index) => {
                return val.email === email ? {
                    firstname: val.newfname,
                    lastname: val.newlname,
                    email: val.newemail
                } : val;
            })
        })

    }
    // useEffect
    // (() => {
    // Axios.get("http://localhost:4001/api/get").then((res)=>{

    // setUserlist(res.data);
    // //console.log(res.data)
    // })
    // },[])

    const submitHandler = () => {
        Axios.post('http://localhost:4001/api/addpost', {
            firstname: firstname,
            lastname: lastname,
            email: email
        }).then(() => {
            console.log("Successful insert");
            setUserlist([...userlist, { firstname, lastname, email }])
        });

    };
    const editForm = (id) => {
        console.log(id)
        Axios.get(`http://localhost:4001/api/edit/${id}`).then((res) => {
            setGetItems(
                userlist.filter((val) => {

                    return val.user_id === id;
                })
            );
        });

    }

    return (
        <div>
            <div className="form">
                {/* {getItems.map((item) => {
                    return (
                        <> */}
                            <input type="text" name="firstname" placeholder="FirstName" onChange={(e) => {
                                setFirstname(e.target.value)
                            }} required /> <br />
                            <input type="text" name="lastname" placeholder="LastName"  onChange={(e) => {
                                setLastname(e.target.value)
                            }} required /> <br />
                            <input type="email" name="email" placeholder="Email"  onChange={(e) => {
                                setEmail(e.target.value)
                            }} required /><br />
                            <button onClick={submitHandler} >SAVE Here..!</button>
{/* 
                        </>
                    )
                })} */}

            </div>
            <button onClick={getUserHandler}>Show User</button>

            <div >
                {userlist.map((val, index) => (
                    <div key={index} className="card">
                        <h1 > {val.firstname}</h1>
                        <h4> {val.lastname}</h4><br />
                        <p> {val.email} </p>
                        {/* {show ? ( <div>
                            <input type="text" placeholder="Enter New FirstName"  onChange={(e) => {
                                setNewfname(e.target.value)
                            }}  /> <br />
                            <input type="text"  placeholder="LastName"  onChange={(e) => {
                                setNewlname(e.target.value)
                            }}  /> <br />
                            <input type="email"  placeholder="Email"  onChange={(e) => {
                                setNewemail(e.target.value)
                            }}  /><br />
                            <button onClick={()=>{updateUser(val.email);}} >{""}Update Here..!</button>
                            <button onClick={() => setShow(false)}
                                style={{ cursor: "pointer" }}>Cancel</button>
                        </div>): null}*/}
                        <div className="updelbtn">
                            <button onClick={() => editForm(val.user_id)}>Edit</button><br />
                            <button onClick={() => { deleteUser(val.email); }}>Delete</button><br />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserForm;
