import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}${id}`;
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

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p className="font-black text-2xl text-blue-900">No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Información del cliente:
      </h1>

      <h1 className="font-black text-3xl mt-4 text-blue-900">
        {cliente.nombre}
      </h1>
      <p className="mt-5 text-xl text-gray-700">
        <span className="uppercase font-bold">Empresa: {""}</span>
        {cliente.empresa}
      </p>
      <p className="mt-5 text-xl text-gray-700">
        <span className="uppercase font-bold">Email: {""}</span>
        {cliente.email}
      </p>
      {cliente.telefono && (
        <p className="mt-5 text-xl text-gray-700">
          <span className="uppercase font-bold">Teléfono: {""}</span>
          {cliente.telefono}
        </p>
      )}
      {cliente.notas && (
        <p className="mt-5 text-xl text-gray-700">
          <span className="mb-5 uppercase font-bold block">Notas:</span>
          <textarea
            className="w-full p-3 shadow-sm border-2"
            rows="6"
            defaultValue={cliente.notas}
            disabled
          ></textarea>
        </p>
      )}
    </div>
  );
};

export default VerCliente;
