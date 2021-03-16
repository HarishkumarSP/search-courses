import React, { Component } from "react";
import '../bootstrap/bootstrap.min.css';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue:'',
            courses: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch =  this.handleSearch.bind(this);
    }
    handleChange = (event) => {
        this.setState(
            {
                searchValue: event.target.value
            }
        ) 
    }

    handleSearch = () => {
        this.makeApiCall(this.state.searchValue);
    }

    makeApiCall = () => {
        let courseUrl = 'https://nut-case.s3.amazonaws.com/coursessc.json';
        console.log(courseUrl);
        fetch(courseUrl)
        .then(respone =>{
            return respone.json()
        })
        .then(jsonData =>{
            console.log(jsonData.courses)
            this.setState({
                courses:jsonData.courses
            });
        });
        console.log(courseUrl);
    }
    render(){
        return (
            <div className="">
            <h1 className="text-center text-primary">Welcome to course listings</h1>
                <input className="form-control" type="text" 
                placeholder="Search" onChange={event => this.handleChange(event) }
                value= {this.state.searchValue} />
                <button className="btn btn-outline-primary" onClick={this.handleSearch}>Search</button>
                {this.state.courses ? (
                    <div>
                        {this.state.courses.map((courses,index)=>{
                            <div key={index}>
                                <h1>Course Id:{courses["Course Id"]}</h1>
                                <div className="card card-primary">
                                    <div className="card-block">
                                        <h2 className="card-title">Course Name:{courses["Course Name"]}</h2>
                                        <label for="provider" className="card-text">Provider:{courses["Provider"]}</label>
                                        <label for="Universities/Institutions" className="card-text">Universities/Institutions:{courses["Universities/Institutions"]}</label>
                                        <label for="Parent Subject" className="card-text">Parent Subject:{courses["Parent Subject"]}</label>
                                        <label for="Child Subject" className="card-text">Child Subject:{courses["Child Subject"]}</label>
                                        <a href={courses["Url"]} >Click here to dive into our course</a>
                                        <label for="Next Session Date">Next Session Date:{courses["Next Session Date"]}</label>
                                        <label for="Length">Length:{courses["Length"]}</label>
                                        <label>Video(Url):<a href={courses["Video(Url)"]}>heloourl</a></label>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                ):(
                   <p>Try Searching for a meal</p> 
                )}
                </div>
                )}
        
    }

 
export default Search