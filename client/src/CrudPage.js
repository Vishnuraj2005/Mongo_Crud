import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function CrudPage()
{

   const [foodName,setFoodName]=useState("");
   const [description,setDecription]=useState("");
   const [foodList,setFoodList]=useState([]);
   const [newFoodName,setNewFoodName]=useState("");
   const [newDescription,setNewDescription]=useState("");

   useEffect(()=>{
    fetchData();
   },[])
   
    //insert 

    const addFoodData=()=>{
        Axios.post("https://mongo-crud-57ta.onrender.com/insert",{foodName,description})
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // get data

    const fetchData=()=>{
        Axios.get("https://mongo-crud-57ta.onrender.com/read").then((response)=>{
            console.log(response.data)
            setFoodList(response.data)
        })
    }

    // update data

    const updateFood=(id)=>{
        Axios.put(`https://mongo-crud-57ta.onrender.com/update`,{id,newFoodName,newDescription})
        .then(()=>fetchData())
    }

    // delete data

    const deleteFood=(id)=>{
        Axios.delete(`https://mongo-crud-57ta.onrender.com/delete/${id}`).then(()=>fetchData())
    }

    return(
        
        <div className="container">
        <h1>This is CrudPage</h1>
          <div className="mb-3">
              <input type="text" className="form-control" placeholder="FoodName" required
              onChange={(e)=>setFoodName(e.target.value)}
              />
          </div>
          <div className="mb-3">
               <input type="text" className="form-control" placeholder="FoodDescription" required
               onChange={(e)=>setDecription(e.target.value)}
              />
          </div>
          <div className="mb-3">
              <button className="btn btn-primary" onClick={addFoodData}>AddFood</button>
          </div>
          

          <h3>View Details</h3>
          <table className='table table-bordered table-striped'>
            <tr>
                <th>FoodName</th>
                <th>FoodDescription</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            <tbody>
                {foodList.map((val,key)=>(
                    <tr key={key}>
                        <td>{val.foodName}</td>
                        <td>{val.description}</td>
                        <td>
                            <input type='text' placeholder='UpdatedFoodName'onChange={(e)=>setNewFoodName(e.target.value)}/>
                            <input type='text' placeholder='UpdatedDescription'onChange={(e)=>setNewDescription(e.target.value)}/>
                            <button className='btn btn-primary' onClick={()=>updateFood(val._id)} >Edit</button>
                           
                        </td>
                        <td>
                             <button className='btn btn-danger'onClick={()=>deleteFood(val._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    )
}
export default CrudPage;
