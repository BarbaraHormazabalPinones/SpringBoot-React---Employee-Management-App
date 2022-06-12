/* Snippets have been used. We use rcc to create the squeleton of a react class */

import React, { Component, useState } from 'react'
import EmployeeService from '../services/EmployeeService'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }



    editEmployee(id){
        this.props.navigate(`/add-employee/${id}`);

    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    viewEmployee(id){
        this.props.navigate(`/view-employee/${id}`);
    }

    /* Vamos a llamar al servicio para traer a los trabajadores */
    componentDidMount(){

        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });


    }
        /*El router de react mantiene un history object, q tiene todo el mapping de los routing.
        El router pasa esa history object a cada ruta como un "prop" por lo que podemos acceder
        a esa historia a través de props */

    addEmployee(){
        this.props.navigate('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <p></p>
                <h2 className ="text-center"> Lista de Empleados </h2> 
                <button className="btn btn-primary" onClick={this.addEmployee}> Agregar Empleado</button>
                <p></p>
               <div className = "row">
                   <table className = "table table-dark table-hover" style = {{width: "100%"}}>
                       <thead className ="thead-dark">
                           <tr>
                           <th className ="text-center">#</th>
                               <th className ="text-center">Nombre Empleado</th>
                               <th className ="text-center">Apellido Empleado</th>
                               <th className ="text-center">Email Empleado</th>
                               <th className ="text-center">Acciones</th>
                           </tr>
                       </thead>
                       <tbody>
                       {
                            this.state.employees.map(
                                employee => 
                                <tr key = {employee.id}>
                                        <td className ="text-center"> { employee.id} </td>   
                                        <td className ="text-center"> { employee.firstName} </td>   
                                        <td className ="text-center"> {employee.lastName}</td>
                                        <td className ="text-center"> {employee.emailId}</td>
                                        <td className ="text-center" style = {{width: "25%"}}> 
                                            {/* //Cuando se quiera enviar una id se utiliza la flechita */}
                                            <button onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info"> Ver </button>
                                            <button style = {{marginLeft: "10px"}}  onClick={ () => this.editEmployee(employee.id)} className="btn btn-warning">Editar </button>
                                            <button style = {{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Eliminar </button>                                         
                                         </td>
                                </tr>

                            )
                        }
                       </tbody>
                   </table>
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

export default withParams(ListEmployeeComponent);


