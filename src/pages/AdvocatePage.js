import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Advocate = () => {
  const params = useParams()
  const username = params.username

  const [advocate, setAdvocate] = useState(null)

  useEffect(() => {
    getData()
  }, [username])

  

  let getData = async () => {
    
    let response = await axios.get(`http://localhost:8000/advocates/${username}/`)
    console.log('RESPONSE:', response)
    setAdvocate(response.data.advocate)
  }


  return (
    <>

      {advocate && (
        <div className="advocate__preview_wrapper">
            
          <img className="advocate__preview_wrapper" src={advocate.profile_pic} />
          <strong>{advocate.name}</strong>
          <a href={advocate.twitter}>@{advocate.username}</a>

          <br />
          <small className='bio__preview'>{advocate.bio}</small>

        </div>
      )}
      
    </>
  )
}

export default Advocate
