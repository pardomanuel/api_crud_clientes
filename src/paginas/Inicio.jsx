import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientesAPI();
  }, []);

  const handleEliminar = async (id, nombre) => {
    const confirmar = confirm(`Desea eliminar el cliente ${nombre}`);

    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        await respuesta.json();

        const nuevoArrayclientes = clientes.filter(
          (cliente) => cliente.id !== id
        );
        setClientes(nuevoArrayclientes);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {clientes.length > 0 ? (
        <div>
          <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
          <p className="mt-5 text-gray-600">Administra tus Clientes</p>
          <table className="w-full mt-5 table-auto shadow-md bg-white">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Empresa</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <Cliente
                  key={cliente.id}
                  cliente={cliente}
                  handleEliminar={handleEliminar}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : 
      (
        <div>
          <h1 className="font-black text-4xl text-blue-900">No hay clientes</h1>

          <Link 
            className="my-5 p-5 bg-slate-200 inline-block rounded-md shadow-md"
            to='/clientes/nuevo'
          >
            Agregue uno nuevo
          </Link>
        </div>
      )}
      
    </>
  );
};

export default Inicio;
