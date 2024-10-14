import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './branches.css'
import { faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { getBranchId, setBranch } from '../../store/branchSlice';

import {BeatLoader} from "react-spinners";

function Branches({openModel}) {
    const [searchBranch,setSearchBranch]=useState(null);


  let [loading, setLoading] = useState(true);
    console.log(searchBranch);
       const SearchBranchByCity=(searchBranch)=>{
            // console.log("clikecd",searchBranch);
            axios.get(`http://localhost:8000/api/branch/branch/${searchBranch}`)
            .then( res=>{
                setBranches(res.data.result)
                console.log(res)
            })
            .catch(error=>{
                console.log(error);
            })
        }
        
   
    const handleClose=()=>{
        openModel(false);
    }
    const dispatch=useDispatch();
    const [branches,setBranches]=useState([]);
    useEffect(()=>{
         axios.get('http://localhost:8000/api/branch/branches',{withCredentials:true})
        .then(
            res=>{
                console.log("from backend for branches ",res)
                if (res.data.Status===true) {
                    console.log("Branches from response:", res.data);

                    setBranches(res.data.result);
                } else {
                    console.log("No data found in response");
                }
                // console.log("Branches",res)
                // setBranches(res.result.rows);

                setLoading(false);
            }
        )
        .catch(error=>
            {
                console.log(error)
                setLoading(false)
            }
        )
    },[])
    console.log("branches new ;",branches)
const handlebranch=(branch)=>{
        console.log("Branch ",branch)
        dispatch(setBranch( branch));
        openModel(false);
    }
    return (
    <div className='brContainer'>
        <div className='brWrapper'>
            <div className='pleaseSelect'>
                {/* <h4>Please select branch to continue</h4> */}
                <div className='serchInput'>
                    <input type='text' placeholder='Search by City'  onChange={(e)=>setSearchBranch(e.target.value)}/>
                    <FontAwesomeIcon  icon={faSearch} className='i'onClick={()=>{SearchBranchByCity(searchBranch)}} />
                </div>
                <FontAwesomeIcon icon={faXmarkCircle}  className='rClose' onClick={handleClose} ></FontAwesomeIcon>
            </div>
            <div className='brList'>    
            {loading?(
                <div className='spinner-container'>
                    <BeatLoader loading={loading} color='red' />
                </div>):
                (branches&&branches.map((branch,id)=>(
                    <div onClick={()=>handlebranch(branch)} className='brCard' key={id}>
                        <h2>{branch.Name}</h2>
                        <div>{branch.City}</div>
                    </div>
                )))
            }    



            </div>
        </div>
    </div>
  )
}

export default Branches