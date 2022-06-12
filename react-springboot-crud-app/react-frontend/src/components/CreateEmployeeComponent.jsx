import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import EmployeeService from '../services/EmployeeService'
import { useParams } from 'react-router-dom';

class CreateEmployeeComponent extends Component {

    constructor(props){
        super(props)

        /**solo para update */
        let {id} = props.params;
        this.state = {
            /* solo para update */
            id: id,
            /*Propiedades que almacenarán la data de la form */
            firstName: '',
            lastName: '',
            emailId: '',
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

/*Para update */
    componentDidMount(){

        if(this.state.id === '_add'){
            return;
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }

    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId}
        // console.log('employee => ' + JSON.stringify(employee));

        var email = employee.emailId;
        var firstName = employee.firstName;
        var lastName = employee.lastName;


        if(firstName !== '' && lastName !== '' && email !== '' ){
            if (validator.isEmail(email)) {
                console.log(this.state.id);
                if(this.state.id === '_add'){
                    EmployeeService.createEmployee(employee).then(res => {
                        this.props.navigate('/employees');
                    })
                }else{
                    EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                        this.props.navigate('/employees');
                    });                   
                }

              } else {
                alert('Mail not valid!')
              }
        }else{
            alert("Please complete the form fields!")
        }


 
    }


    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Agregar Empleado</h3>
        }else{
            return <h3 className="text-center">Editar Empleado</h3>
        }
    }

    cancel(){
        this.props.navigate('/employees');
    }


    render() {
        return (
            <div>
                <p></p>
                    <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                    <div className ="card-body">
                                        <form>
                                            <div className = "form-group">
                                                <label>Nombre</label>
                                                <input placeholder = "First Name" name="firstName" className = "form-control"
                                                value = {this.state.firstName} onChange = {this.changeFirstNameHandler} />
                                            </div>
                                            <div className = "form-group">
                                                <label>Apellido</label>
                                                <input placeholder = "Last Name" name="lastName" className = "form-control"
                                                value = {this.state.lastName} onChange = {this.changeLastNameHandler} />
                                            </div>             
                                            <div className = "form-group">
                                                <label>Email</label>
                                                <input placeholder = "Email Address" name="emailId" className = "form-control"
                                                value = {this.state.emailId} onChange = {this.changeEmailHandler} />
                                            </div>
                                            <p></p>
                                            <div className="buttonHolder">
                                                <button className ="btn btn-success" onClick={this.saveOrUpdateEmployee}> Guardar </button>
                                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>                                    
                                            </div>
                                        </form>
                                    </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

// function WithNavigate(props){
//     const navigate = useNavigate();
//     return <CreateEmployeeComponent {...props} navigate={navigate}/>
// }

// export default WithNavigate;

export const withParams = Component => props => {
    let params = useParams();
    const navigate = useNavigate();
    return <Component  {...props} params={params} navigate={navigate} />;
}
export default withParams(CreateEmployeeComponent);