import axios from "axios";
import React, { useEffect, useState } from "react";
import "./userform.css";

const Form = () => {
  const [userList, setUserList] = useState({
    user_id:null,
    firstname: null,
    lastname: null,
    email: null,
  });
  // console.log(userList, "userlistjjjj");
  const [tabledata, setTableDara] = useState([]);
 

  console.log(userList);
  const submitHandler = async(e) => {
    alert("A form was submitted: " + userList);
    const res = await axios.post("http://localhost:4001/api/addpost", userList)
    // axios
      // .post("http://localhost:4001/api/addpost", userList)
      // .then(response => this.setState({ articleId: response.data.id }));
      // .then((response) => console.log(response));
    e.preventDefault();
  };

  useEffect(() => {
    const getAllData = async() => {
    const res =  await axios.get("http://localhost:4001/api/get");
    console.log(res.data.data)
    setTableDara(res.data.data)
    }
    getAllData();
    // axios
    //   .get("http://localhost:4001/api/get")
    //   .then((response) => setTableDara(response.data.data));
  }, []);

  const onChangeHandler = (e) => {
    setUserList({
      ...userList,
      [e.target.name]: e.target.value,
    });
    console.log("handler", e.target.value);
  };

  const editHandler = async (id) => {
    console.log(id);
    const res = await axios.get(`http://localhost:4001/api/edit/${id}`)
    console.log(res,"editgetby id")
       setUserList(
        tabledata.filter((item) => item.user_id===id
        )[0]
       )
     
  }



  const updateHandler = async(id) =>{
    console.log(id);
    const res = await axios.post(`http://localhost:4001/updatepost/${id}`, userList);
    console.log("update 53",res);
    setUserList({firstname:'',
    lastname:'',
    email:''})
    
};
const DeleteHandler =async(id)=>{
  console.log("deleteHandler",id);
  const res = await axios.delete(`http://localhost:4001/api/delete/${id}`);
  console.log(res,"Delete62")
}

  return (
    <>
      <div className="form">
        <input
          type="text"
          name="firstname"
          placeholder="FirstName"
          onChange={onChangeHandler}
          value={userList.firstname}
          required
        />{" "}
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="LastName"
          onChange={onChangeHandler}
          value={userList.lastname}

          required
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userList.email}
          onChange={onChangeHandler}
          required
        />
        <br />
        <div>
        {userList.user_id ? 
          <button className="addUserButton" onClick={() => updateHandler(userList.user_id)}>
                    Update Here..!!
                  </button>:  
          <button  className="addUserButton" onClick={submitHandler}>SAVE Here..!</button>
      }
      </div>
        {tabledata.map((item, index) => {
          return (
            <>
              <div key={index} className="card">
                <h2>{item.firstname}</h2>
                <h4>{item.lastname}</h4>
                <p>{item.email}</p>
                <div className="updelbtn">
                  <div>
                  <button className="addUserButton" onClick={() => editHandler(item.user_id)}>
                    edit
                  </button>
                  </div>
                  <br />
                  <div>
                  <button className="addUserButton" onClick={()=>DeleteHandler(item.user_id)}>Delete</button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Form;
