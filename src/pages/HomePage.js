import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import React from 'react'

const HomePage = () => {

  const [advocates, setAdvocates] = useState([])

  useEffect(() => {
    getData()
  }, [])

  

  let getData = async (query = '') => {
    
    let response = await axios.get(`http://localhost:8000/advocates/?query=${query}`)
    console.log('RESPONSE:', response)
    setAdvocates(response.data)
  }

  let searchData = (e) => {
    e.preventDefault()
    let query = e.target.query.value
    getData(query)
  }

  return (
    <div className="main--container">
      <h1>Search about developers found by @sahil's webscrapper and the Twitter API calling</h1>
      <div className="form--container">
        <form onSubmit={searchData} id="search_form">
            <input type="text" name="query" placeholder="Search advocates"/>
            <input type="submit" value="search" className="btn-primary"/>
        </form>
      </div>
      <div className="advocate__list">
            {advocates.map((advocate, index) => (
                <div className="advocate__preview_wrapper" key={index}>
                    <div className="advocate__preview__header">
                    <Link to={`/advocates/${advocate.username}`}>
                        <img className="advocate__preview__wrapper" src={advocate.profile_pic}/>
                        <div>
                            <strong>{advocate.name}</strong>
                            <a href={advocate.twitter} target="_blank">@{advocate.username}</a>
                        </div>
                    </Link>
                    </div>
                    <br/>
                    <small>{advocate.bio}</small>
                    
                </div>
            ) )}
      </div>

    </div>
  )
}

export default HomePage
