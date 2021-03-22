const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = " SELECT * FROM user ";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async getUser(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                console.log(id,"in db")
                const query = " SELECT * FROM user WHERE user_id = id";

                connection.query(query, (err, results) => {
                    if (err) {reject(new Error(err.message));} else{
                    resolve(results);}
                })
            });

            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async insertNewPost(firstname, lastname, email) {
        try {

            const response = await new Promise((resolve, reject) => {
                const query = " INSERT INTO user (firstname, lastname, email) VALUES (?,?,?) ";

                connection.query(query, [firstname, lastname, email], (err, results) => {
                    if (err) { reject(new Error(err.message)); }
                    else {
                        console.log("the result is ======", results)
                        resolve(results);
                    }
                })
            });
            return {

                firstname: firstname,
                lastname: lastname,
                email: email
            }
        } catch (error) {
            console.log(error);
        }
    }

 

    async deleteRowById(id){
                try{

                    console.log("id", id);
                    const res = await new Promise((resolve, reject) => {
                        const query = " DELETE FROM user WHERE user_id = ?";

                        connection.query(query, [id], (err, result) => {
                            if (err) { reject(new Error(err.message)); }
                            else { resolve(result.affectedRows); }
                        })
                    });
                    console.log(res);
                    return res === 1 ? true : false;

                }catch(error) {
                    console.log(error);
                    return false;
                }
            }
    async updateRowByEmail(firstname, lastname, email){
                try{

                    console.log(firstname, lastname, email)
            const res = await new Promise((resolve, reject) => {
                        const query = "UPDATE user SET firstname = ? , lastname = ?  WHERE email = ?";

                        connection.query(query, [firstname, lastname, email], (err, results) => {
                            if (err) { reject(new Error(err.message)); } else {
                                resolve(results.affectedRows);
                            }
                        })
                    });

                    console.log(res);
                    return res === 1 ? true : false;
                }
        catch(error) {
                    console.log(error);
                    return false;
                }
            }
            
//update by id
async updateRowById(id,firstname,lastname,email){
    try{
        id = parseInt(id, 10);
        console.log(id,firstname,lastname,email)
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE user SET firstname = ? , lastname = ? , email = ? WHERE user_id = ?";

            connection.query(query, [firstname, lastname, email, id], (err, results) => {
                if (err) {reject(new Error(err.message));}else{
                resolve(results.affectedRows);}
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

}

module.exports = DbService;


// getAllData(){
//     const sqlSelect = " SELECT * FROM user";
//     connection.query(sqlSelect, (err, results)=>{
//         if (err){new Error(err.message);}
//         else{results;}
//     });
// };

// insertNewPost(firstname,lastname,email){
//    const sqlInsert="INSERT INTO user (firstname,lastname,email) VALUES (?,?,?)";
//    connection.query(sqlInsert,[firstname, lastname, email], (err, result )=>{
//        if(err){ new Error(err.message);}
//                else {
//                    console.log("the result is ======", result)
//                    result;}
//    });
// };