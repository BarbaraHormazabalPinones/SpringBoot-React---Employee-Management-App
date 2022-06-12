/* Snippets have been used. We use rcc to create the squeleton of a react class */

import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import { useParams } from 'react-router-dom';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        let {id} = props.params;

        this.state = {
            id: id,
            employee: {}
        }

        this.backButton = this.backButton.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            this.setState({employee: res.data});
        });
    }

    backButton(){
        this.props.navigate('/employees');
    }

    editEmployee(id){
        this.props.navigate(`/add-employee/${id}`);

    }

    render() {
        return (
            <div>
                <h2> Ver Información sobre {this.state.employee.firstName} {this.state.employee.lastName}</h2>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Ver Detalles Empleado</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <b> Nombre Empleado: </b>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <b> Apellido Empleado: </b>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <b> Email Empleado: </b>
                            <div> { this.state.employee.emailId }</div>
                        </div>
                    </div>
                </div>
                <p></p>
                <div className ="text-center">
                    <button className="btn btn-dark" onClick={this.backButton}>Atrás</button>
                    <button className="btn btn-dark"style = {{marginLeft: "10px"}}  onClick={ () => this.editEmployee(this.state.employee.id)}>Editar</button>
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
export default withParams(ViewEmployeeComponent);


