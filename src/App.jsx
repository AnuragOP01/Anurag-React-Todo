import React, { useState } from 'react'
import { useEffect } from 'react';
import { EmployeeData } from './Component/EmployeeData';

function App() {
  const [data,setData] = useState([]);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [age,setAge] = useState(0)
  const [update,setUpdate] = useState(false)
  const [id,setId] = useState(0)

  useEffect(()=>{
    setData(EmployeeData);
  },[]);

  const selectUpdate = (index) => {
      if(index > 0){
        const dt = data.filter(item => item.id === index)
        setFirstName(dt[0].FirstName)
        setLastName(dt[0].LastName)
        setAge(dt[0].age)
        setUpdate(true)
        setId(index)
      }
  }

  const deleteRow = (index) => {
    if(index > 0){
      if(window.confirm("Are You Sure To Delete?")){
        const dt = data.filter(item => item.id !== index)
        setData(dt);
        setId(0)
        setUpdate(false)
      }
    }
  }

  const handleClear = ()=>{
    setFirstName('')
    setLastName('')
    setAge('')
    setUpdate(false)
    setId(0)
  }

  const handleSave = ()=>{
    let err = ''
    if(firstName==='')
      err += `Enter First Name `;
    if(lastName==='')
      err += `Enter Last Name `;
    if(age<=0 ||age==='')
      err += `Enter Age`;
    if(err !== '')
    {
      alert(err)
      return;
    }
    const dt = {
      id: data.length + 1,
      FirstName : firstName,
      LastName: lastName,
      age: age,
    }
    const arr = [];
    data.map((item)=>{
      arr.push(item)
    })
    arr.push(dt);
    setData(arr);
    handleClear()
  }

  const handleUpdate = ()=>{
    let err = ''
    if(id<=0)
      err += `Invalid Id `
    if(firstName==='')
      err += `Enter First Name `;
    if(lastName==='')
      err += `Enter Last Name `;
    if(age<=0 ||age==='')
      err += `Enter Age`;
    if(err !== '')
    {
      alert(err)
      return;
    }
    const arr = []
    data.map(item=>{
      if(item.id === id){
        arr.push({id:id,FirstName:firstName,LastName:lastName,age:age})
      }
      else{
      arr.push(item)
      }
    })
    setData(arr)
    handleClear()
  }
  return (
  <>
  <div className='bg-blue-600 min-h-screen w-full'>
    <h1 className=" text-center rounded-sm  text-white text-4xl">This is a simple <span className=' font-bold'> CRUD Application</span></h1>
    
    <div className=" rounded-md bg-cyan-500 border md:w-5/6 m-auto py-3 my-5 flex justify-center flex-col lg:flex-row">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-3'>
      <div className=' inline-block'>
      <label className='p-4 font-bold'>FirstName : 
        <input className=' block sm:inline h-10 rounded-xl' type="text" placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
      </label>
      </div>
      <div className=' inline-block'>
      <label className='p-4 font-bold'>LastName : 
        <input className=' block sm:inline h-10 rounded-xl' type="text" placeholder='Enter Last Name' onChange={(e)=>setLastName(e.target.value)} value={lastName} />
      </label>
      </div >
      <div className=' inline-block'>
      <label className='p-4 font-bold'>Age :   
        <input className=' block h-10 sm:inline rounded-xl' type="number" placeholder='Enter your Age' onChange={(e)=>setAge(e.target.value)} value={age} />
      </label>
      </div>
      </div>
      <div className="block my-2">
      {
        !update?
       <button onClick={()=>{handleSave()}} className="px-4 py-2 bg-blue-600 max-h-16 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none active:bg-blue-900 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Save</button> 
       :
       <button onClick={()=>{handleUpdate()}} className="px-4 py-2 bg-blue-600 max-h-16 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none active:bg-blue-900 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Update</button> 
       }
       <button onClick={()=>{handleClear()}} className=" px-4 py-2 bg-red-500 max-h-16 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">Clear</button>
       </div>
    </div>
    
    <table className=' bg-cyan-400 border-collapse m-auto border border-white w-full  sm:w-5/6 mt-10 table table-auto hover:table-auto rounded-xl'>
      <thead>
        <tr className=' bg-stone-400'>
          <th className='border border-slate-300 py-4 text-black font-extrabold'>ID</th>
          <th className='border border-slate-300 text-black font-extrabold'>FirstName</th>
          <th className='border border-slate-300 text-black font-extrabold'>LastName</th>
          <th className='border border-slate-300 text-black font-extrabold'>Age</th>
          <th className='border border-slate-300'>
            Actions
          </th>
        </tr>
      </thead>
      
      <tbody>
        {
          data.map((item,index)=> {
            return (
            <tr key={index+1} className='border border-slate-300 hover:bg-orange-400'>
              <td className='p-3 border border-slate-300'>{item.id}</td>
              <td className='p-3 border border-slate-300'>{item.FirstName}</td>
              <td className='p-3 border border-slate-300'>{item.LastName}</td>
              <td className='p-3 border border-slate-300'>{item.age}</td>
              <td className=' p-3 border border-slate-300 flex gap-2 justify-around items-around flex-col sm:flex-row '>
              <button onClick={()=>selectUpdate(item.id)} className=" px-4 py-2 max-w-24 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 active:bg-green-800">Edit</button>
              
              <button onClick={()=>deleteRow(item.id)} className=" px-4 py-2 max-w-24 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 active:bg-red-800">Delete</button>
              </td>
            </tr>
            )
        })
        }
      </tbody>
    </table>
    </div>
  </>
  )
}

export default App
