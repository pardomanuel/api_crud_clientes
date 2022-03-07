import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El Nombre del cliente es Obligatorio")
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .required("El mail es obligatorio")
      .email("El formato del mail es incorrecto"),
    telefono: Yup.number()
      .typeError("El numero es inválido")
      .integer()
      .positive("Número no válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        const respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });

        await respuesta.json();
        navigate("/clientes");
      } else {
        const url = "http://localhost:4000/clientes";

        const respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate("/clientes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-md md: w-3/4 m-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente.nombre ?? "",
          empresa: cliente.empresa ?? "",
          email: cliente.email ?? "",
          telefono: cliente.telefono ?? "",
          notas: cliente.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="nombre">
                Nombre
              </label>
              <Field
                id="nombre"
                className="mt-2 block w-full p-3 bg-gray-50"
                type="text"
                placeholder="Nombre del cliente"
                name="nombre"
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="empresa">
                Empresa
              </label>
              <Field
                id="empresa"
                className="mt-2 block w-full p-3 bg-gray-50"
                type="text"
                placeholder="Nombre de la Empresa"
                name="empresa"
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="email">
                E-mail
              </label>
              <Field
                id="email"
                className="mt-2 block w-full p-3 bg-gray-50"
                type="email"
                placeholder="Email"
                name="email"
              />
              {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="telefono">
                Teléfono
              </label>
              <Field
                id="telefono"
                className="mt-2 block w-full p-3 bg-gray-50"
                type="tel"
                placeholder="Teléfono del cliente"
                name="telefono"
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="notas">
                Notas
              </label>
              <Field
                as="textarea"
                id="notas"
                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                type="text"
                placeholder="Notas del Cliente"
                name="notas"
              />
            </div>
            <input
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer"
              value={cliente.nombre ? "Editar Cliente" : "Agregar Cliente"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
