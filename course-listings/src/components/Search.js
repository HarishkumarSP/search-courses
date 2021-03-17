import React, { Component } from "react";
import '../bootstrap/bootstrap.min.css';
import axios from 'axios';


class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue:'',
            courses: [],
            searchedCourse: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getCourseDetails = this.getCourseDetails.bind(this);
        this.getSpecificCourse = this.getSpecificCourse.bind(this)
        this.handleSearch =  this.handleSearch.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            searchValue : event.target.value
        });
    }    
    
    getCourseDetails = async () => {
        let courseUrl = await axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
        this.setState({
            courses : courseUrl.data
        });     
    }

    getSpecificCourse = async () => {
        const { search } = this.state;
        let courseUrl = await axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
        let getCourse = await courseUrl.data.map((datas,index)=>{
            let searchData = ["Provider","Child Subject","Universities/Institutions"," Next Session Date","Course Name"]
            for(let i=0; i<searchData.length; i++){
            if(datas[searchData[i]] === search){
                return datas[i];
            }
        }
        return "Sorry no data found...Please try other courses"
        })
        this.setState({
            searchedCourse: getCourse
        })
    }

    handleSearch = async () => {
        const { search } = this.state;
        this.getSpecificCourse(search);
    }
    
    render(){
        const { searchValue,courses } = this.state;
        return (
            <div className="container-fluid bg-dark">
            <h1 className="text-center text-primary">Welcome to our Course world</h1>
                <input className="form-control" type="text" name="searchValue" 
                placeholder="Search" value={searchValue} onChange={(event)=> this.handleChange(event)}/>
                <button className="btn btn-outline-primary" onClick={this.getCourseDetails}>View Courses</button>
                <button className="btn btn-outline-primary" onClick={this.handleSearch}><i className="fa fa-search search-icon"/>  Search</button>
                <div>
                    {courses ? (
                    <div className="row">
                        <div className="col-12 col-md-8">
                        <p className="text-primary text-end total-found md-8">Total courses found : {courses.length}</p>
                        {courses.map((course,index) => {
                            <h3 className="text-primary">All Courses:</h3>
                            return (
                            <div key={index}>
                                <h1>Course Id:{course["Course Id"]}</h1>
                                <div className="card card-primary bg-primary">
                                    <div className="card-block">
                                        <h2 className="card-title"><strong>Course Name: </strong>{course["Course Name"]}</h2>
                                        <label htmlFor="provider" className="card-text"><strong>Provider: </strong>{course["Provider"]}</label><br />
                                        <label htmlFor="Universities/Institutions" className="card-text"><strong>Universities/Institutions: </strong>{course["Universities/Institutions"]}</label><br />
                                        <label htmlFor="Parent Subject" className="card-text"><strong>Parent Subject: </strong>{course["Parent Subject"]}</label><br />
                                        <label htmlFor="Child Subject" className="card-text"><strong>Child Subject: </strong>{course["Child Subject"]}</label><br />
                                        <label><strong>Course Url: </strong><a className="card-link" href={course["Url"]} >Click here to dive into our course</a></label><br />
                                        <label htmlFor="Next Session Date"><strong>Next Session Date: </strong>{course["Next Session Date"]}</label><br />
                                        <label htmlFor="Length"><strong>Length: </strong>{course["Length"]}</label><br />
                                        <label><strong>Video(Url): </strong><a className="card-link bg-dark" href={course["Video(Url)"]}>Click here for video tutorial</a></label>
                                    </div>
                                </div>
                            </div>
                        )})}
                     </div>
                </div>
                ):(
                    <div className="card text-center">
                   <h2>Try Searching for a courses</h2> 
                   </div>
                )}

                </div>    
                 </div>
                )}
        
    }

export default Search