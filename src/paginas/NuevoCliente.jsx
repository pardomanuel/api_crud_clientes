import Formulario from "../components/Formulario";

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>

      <p className="mt-5 text-gray-600">
        Completa el formulario para registrar un nuevo cliente
      </p>

      <Formulario />
    </>
  );
};

export default NuevoCliente;
