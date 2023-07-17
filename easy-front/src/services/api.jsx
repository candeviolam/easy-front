//llamar a la api que hemos creado en el archivo backend -> node js
//acá tenemos los servicios creados p/consumir la api (la consumimos en App.jsx)

//crear todas las funciones que van a hacer las peticiones a la base de datos y las vamos a exportar

//hacemos el get
//acá no necesitamos mandarle el (verbo) método get, pq el get está implícito
//vamos a hacer una func asíncrona
//                    hago un obj en lugar de recibir directam "persona" p/no verificar el orden(? -> pedir objs a través de las funcs
async function GetEmployee() {
  //traer el get (en postman lo puedo sacar) del arch backend y hacer un fetch
  //               vamos a hacer una func asíncrona
  const response = await fetch("https://localhost:3000/empleados");
  /* ésto es lo mismo que lo de abajo que está resumido
  const res = await response.json();
  return res;
  */
  //que espere la respuesta de la conversión en json y dsp la retorne
  return await response.json();
}

//hacemos el post
//le mandamos el método post especificando cuál es la acción que queremos realizar en el back
async function AddEmployee({ nombre, apellido, dni }) {
  //va a hacer lo mismo que get(?, pero 1ero voy a crear un obj que se va a llamar body, que va a ser = a un obj..
  //tenemos nstro body creado
  const body = {
    nombre,
    apellido,
    dni,
  };

  //                           necesitamos la url p/agregar empleados
  //                                                               como 2do parám el fetch recibe un obj que tiene una propiedad que se llama method, y en el método le vamos a decir que le vamos a mandar un post
  const response = await fetch("https://localhost:3000/empleados", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //2da propiedad, el body
    //    éste JSON.string.. podría haber ido acá o en la constante de arriba (const body = JSON.stringify({nomb..}))
    body: JSON.stringify(body),
  });

  //pq la respuesta nos va a llegar codificada
  return await response.json();
}

export { GetEmployee, AddEmployee };
