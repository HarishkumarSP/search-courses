import React, { Component } from "react";
import '../bootstrap/bootstrap.min.css';
import axios from 'axios';


class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue:'',
            courses: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch =  this.handleSearch.bind(this);
        this.getCourseDetails = this.getCourseDetails.bind(this);
    }

    handleChange = (event) => {
        this.setState(
            {
                searchValue: event.target.value
            }
        ) 
    }

    getCourseDetails = async () => {
        try {
            let response = await axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
            .then((response)=> console.log(response))
            .then((data)=> console.log(data))
            this.setState({
                courses : response.data
            });
        } catch (err) {
            console.log(err);
        }
   
    }

    handleSearch = () => {
        this.getCourseDetails(this.state.searchValue);
    }

    render(){
        return (
            <div className="">
            <h1 className="text-center text-primary">Welcome to course listings</h1>
                <input className="form-control" type="text" 
                placeholder="Search" onChange={(event) => this.handleChange(event) }
                value= {this.state.searchValue} />
                <button className="btn btn-outline-primary" onClick={this.handleSearch}>Search</button>
                {this.state.courses ? (
                    <div>
                        {this.state.courses.map((course)=>{
                            <div key={course["Course Id"]}>
                                <h1>Course Id:{course["Course Id"]}</h1>
                                <div className="card card-primary">
                                    <div className="card-block">
                                        <h2 className="card-title">Course Name:{course["Course Name"]}</h2>
                                        <label for="provider" className="card-text">Provider:{course["Provider"]}</label>
                                        <label for="Universities/Institutions" className="card-text">Universities/Institutions:{course["Universities/Institutions"]}</label>
                                        <label for="Parent Subject" className="card-text">Parent Subject:{course["Parent Subject"]}</label>
                                        <label for="Child Subject" className="card-text">Child Subject:{course["Child Subject"]}</label>
                                        <a href={course["Url"]} >Click here to dive into our course</a>
                                        <label for="Next Session Date">Next Session Date:{course["Next Session Date"]}</label>
                                        <label for="Length">Length:{course["Length"]}</label>
                                        <label>Video(Url):<a href={course["Video(Url)"]}>heloourl</a></label>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                ):(
                   <p>Try Searching for a courses</p> 
                )}
                </div>
                )}
        
    }

export default Search