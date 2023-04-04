import styles from "@/styles/Home.module.css";
import { useState } from "react";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";

export default function Checkout() {
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUF] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const handleChangeZipCode = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newZipCode = event.target.value;
    setZipCode(newZipCode.replace(/[^0-9]/g, ""));
    if (zipCode.length === 8) {
      consultarEndereco();
    }
  };

  const consultarEndereco = async () => {
    try {
      const url = `https://viacep.com.br/ws/${zipCode}/json/`;

      const response = await fetch(url);
      const data = await response.json();
      if (!data?.error) {
        setCity(data.localidade);
        setUF(data.uf);
        setNeighborhood("Brasil");
        setStreet(data.logradouro);
      } else {
        toast.error("CEP não encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="bg-primary-blue fixed w-full z-50"></header>
      <main className={`${styles.main} sm:p-1`}>
        <div>
          <ToastContainer />
        </div>
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Informações do Cliente
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Nos informe os seus dados para que seja feito o envio dos
                produtos
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Primeiro Nome
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Código postal
                  </label>
                  <div className="mt-2">
                    <InputMask
                      mask="99999-999"
                      maskChar="_"
                      onChange={handleChangeZipCode}
                      value={zipCode}
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="neighborhood"
                    className="blocktext-sm font-medium leading-6 text-gray-900"
                  >
                    Bairro
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      autoComplete="neighborhood-name"
                      disabled
                      value={neighborhood}
                      className="disabled block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Logradouro
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      disabled
                      value={street}
                      className="disabled block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="m:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Numero
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="disabled block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cidade
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      disabled
                      value={city}
                      className="disabled block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Estado
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      disabled
                      value={uf}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
            >
              Enviar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
