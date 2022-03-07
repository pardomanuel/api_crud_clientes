import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Formulario from "../components/Formulario";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        setCliente(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>

      <p className="mt-5 text-gray-600">Edita los datos de tu cliente</p>

      {cargando ? (
        <Spinner />
      ) : cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <h3 className="font-black text-3xl text-red-500 uppercase mt-10 block">
          Cliente no válido
        </h3>
      )}
    </>
  );
};

export default EditarCliente;
