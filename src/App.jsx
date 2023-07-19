import { Container } from "react-bootstrap";
import { Table } from "react-bootstrap";
//p/trabajar con una api vamos a tener que usar un useEffect, que nos va a traer del servidor los datos que pidamos y nos va a permitir controlar lo que son los efectos secundarios (loes efecto que están lejos de nstro alcance)
import { useState, useEffect } from "react";
//abajo de las importaciones de react (?
import { AddEmployee, GetEmployee } from "./services/api";

import "./App.css";

function App() {
  const [empleados, setEmpleados] = useState([]);
  //guardar los datos a través del llenado del formulario con un estado que va a ser un obj
  const [empleadoNuevo, setEmpleadoNuevo] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  //funcionalidad p/q cuando guarde un nuevo empleado, se actualice la tabla del sitio
  //voy a crear un booleano
  const [reload, setReload] = useState(false); // pongo en las dependencias de abajo reload
  //             abajo cuando haga un agregado de un nuevo empleado (AddEmployee) usamos el setReload

  useEffect(() => {
    //si quisiera traer 1ero todos los empleados, tendría que importar 1ero GetEmployee arriba
    //vamos a usar la func -> crear un func e invocarla
    //.then me devuelve literalmente la respuesta, que yo la guardo en un useState(?
    //dentro de la func (en api.jsx) ya hice el .json(), así que no hace falta que lo haga acá de nuevo
    GetEmployee()
      .then((res) => {
        console.log(res);
        //que cuando llegue la respuesta, hagamos el set de empleados y vamos a pedirles a los empleados que se guarden acá (en la respuesta)
        setEmpleados(res);
      })
      .catch((err) => console.log(err));
  }, [reload]); // -> c/vez que cambie reload vamos a actualizar este useEffect

  //dsp de hacer éstas consts, nos vamos hasta el input de abajo y ponerle el onChange
  const handleNombreChange = (e) => {
    //setEmpleadoNuevo va a ser un obj que va a decir..
    setEmpleadoNuevo({
      //con estos puntos (...) le estoy diciendo que quiiero crear el mismo obj que ya tengo pero solamente modificándole el valor de nombre -> pisar el valor del nombre
      ...empleadoNuevo,
      nombre: e.target.value,
    });
  };
  const handleApellidoChange = (e) => {
    //setEmpleadoNuevo va a ser un obj que va a decir..
    setEmpleadoNuevo({
      //con estos puntos (...) le estoy diciendo que quiiero crear el mismo obj que ya tengo pero solamente modificándole el valor de nombre -> pisar el valor del nombre
      ...empleadoNuevo,
      apellido: e.target.value,
    });
  };
  const handleDniChange = (e) => {
    //setEmpleadoNuevo va a ser un obj que va a decir..
    setEmpleadoNuevo({
      //con estos puntos (...) le estoy diciendo que quiiero crear el mismo obj que ya tengo pero solamente modificándole el valor de nombre -> pisar el valor del nombre
      ...empleadoNuevo,
      dni: e.target.value,
    });
  };
  //dsp de haber hecho éstas consts, nos vamos hasta el input de abajo y ponerle el onChange

  //dsp hacer que cuando hagamos click en el botón, podamos guardar los datos (onClick en el button) con la const de abajo
  //petición que se va a encargar de guardar el empleado nuevo(?
  const handleClick = (e) => {
    e.preventDefault(); // -> pq está adentro de un formulario
    e.stopPropagation();

    //dentro de éste método vamos a usar el AddEmployee
    /* así era el código antes de solo pasarle empleadoNuevo entre paréntesis    
    AddEmployee({
      nombre: empleadoNuevo.nombre,
      apellido: empleadoNuevo.apellido,
      dni: empleadoNuevo.dni,
    });
    */
    //como el obj del empleado es exactamente igual al obj que necesita la func, puedo pasarle directam empleadoNuevo y listo
    AddEmployee(empleadoNuevo)
      //como ésto es una promesa, vamos a pasarle el .then
      //  vamos a decir que cuando la promesa se cumpla
      .then((res) => {
        console.log(res);
        //        vamos a cambiar el estado de reload
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid className="contenedor">
      <form className="formulario">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          id="empleado"
          onChange={handleNombreChange}
        ></input>
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          id="empleado"
          onChange={handleApellidoChange}
        ></input>
        <label>Dni</label>
        <input
          type="text"
          name="dni"
          id="empleado"
          onChange={handleDniChange}
        ></input>
        <div className="boton">
          <button className="btn btn-primary" onClick={handleClick}>
            Guardar
          </button>
        </div>
      </form>
      <div className="resultados">
        <Table>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp, index) => {
              return (
                <tr key={index}>
                  <td>{emp.id}</td>
                  <td>{emp.nombre}</td>
                  <td>{emp.apellido}</td>
                  <td>{emp.dni}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
    //        en el return ponemos el código que tenía afuera como html antes
    //                 el map recibe el empleado y el index, necesitamos pasarle el key
    //      puedo usar todo ésto de empleado pq arriba en el useState lo declare como un array vacío
    //      si empleados.length es === a 0 vamos a poner un span que diga.., de lo contrario vamos a retornar empleados.map:
    /* tenía ésto como código del map, pero me dice que no puedo poner un <span> dentro de un <tbody>, entonces borré el map y quedó como está arriba
    {empleados.length === 0 ? (
              <span>No hay resultados</span>
            ) : (
              empleados.map((emp, index) => {
                return (
                  <tr key={index}>
                    <td>{emp.id}</td>
                    <td>{emp.nombre}</td>
                    <td>{emp.apellido}</td>
                    <td>{emp.dni}</td>
                  </tr>
                );
              })
            )}
    */
  );
}

export default App;
