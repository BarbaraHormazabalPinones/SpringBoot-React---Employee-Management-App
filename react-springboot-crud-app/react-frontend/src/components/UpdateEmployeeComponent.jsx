import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import EmployeeService from '../services/EmployeeService'
import { useParams } from 'react-router-dom';

class UpdateEmployeeComponent extends Component {

    constructor(props){
        super(props)

        let {id} = props.params;

        this.state = {
            /*Propiedades que almacenarán la data de la form */
            // id: this.props.match.params.id,
            id: id,
            firstName: '',
            lastName: '',
            emailId: '',
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({firstName: employee.firstName,
                lastName: employee.lastName,
                emailId : employee.emailId
            });
        });
    }

    updateEmployee  = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId}
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));

        var email = employee.emailId;
        var firstName = employee.firstName;
        var lastName = employee.lastName;


        if(firstName !== '' && lastName !== '' && email !== '' ){
            if (validator.isEmail(email)) {
                EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                    this.props.navigate('/employees');
                });
              } else {
                alert('Mail not valid!')
              }
        }else{
            alert("Please complete the form fields!")
        }


    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }


    cancel(){
        this.props.navigate('/employees');
    }


    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">Update Employee</h3>
                                <div className ="card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>First Name</label>
                                            <input placeholder = "First Name" name="firstName" className = "form-control"
                                            value = {this.state.firstName} onChange = {this.changeFirstNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label>Last Name</label>
                                            <input placeholder = "Last Name" name="lastName" className = "form-control"
                                            value = {this.state.lastName} onChange = {this.changeLastNameHandler} />
                                        </div>             
                                        <div className = "form-group">
                                            <label>Email Address</label>
                                            <input placeholder = "Email Address" name="emailId" className = "form-control"
                                            value = {this.state.emailId} onChange = {this.changeEmailHandler} />
                                        </div>
                                        <p></p>
                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const withParams = Component => props => {
    let params = useParams();
    const navigate = useNavigate();
    return <Component  {...props} params={params} navigate={navigate} />;
}
export default withParams(UpdateEmployeeComponent);