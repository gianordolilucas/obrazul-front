import { useCart } from "@/context/CartContextProvider";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import React, { FormEvent } from "react";
import router from "next/router";

type Card = {
  cardNumber: string;
  cardName: string;
  cardExpiration: string;
  cardCvv: string;
};

type Pix = {
  pixKey?: string;
};

type Boleto = {
  boletoEmail?: string;
};
interface PaymentData {
  paymentMethod: Card | Pix | Boleto;
  paymentMethodname: "pix" | "card" | "boleto";
}

export default function Checkout() {
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUF] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const { cartState, removeItem } = useCart();
  const [paymentData, setFormData] = useState<PaymentData>({
    paymentMethod: { pixKey: "" },
    paymentMethodname: "pix",
  });
  const [requiredFields, setRequiredFields] = useState({});

  const [card, setCard] = useState<Card>({
    cardNumber: "",
    cardName: "",
    cardExpiration: "",
    cardCvv: "",
  });

  const [pix, setPix] = useState<Pix>();

  const [boleto, setBoleto] = useState<Boleto>();

  const handleChangeZipCode = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newZipCode = event.target.value;
    setZipCode(newZipCode.replace(/[^0-9]/g, ""));
    if (zipCode.length === 8) {
      consultarEndereco();
    }
  };
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const paymentMethodname = e.target.value as "pix" | "card" | "boleto";
    setFormData((prevFormData) => ({ ...prevFormData, paymentMethodname }));

    const value = e.target.value;
    let requiredFields = {};

    if (value === "pix") {
      requiredFields = {
        pixKey: true,
      };
    } else if (value === "card") {
      requiredFields = {
        cardNumber: true,
        cardName: true,
        cardExpiration: true,
        cardCvv: true,
      };
    } else if (value === "boleto") {
      requiredFields = {
        boletoEmail: true,
      };
    }
    setRequiredFields(requiredFields);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.error("Enviando todos os dados");
    router.push("/");
    return;
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
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Informações dos Produtos
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Segue os itens em seu carrinho
              </p>
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartState.items.map((item) => (
                      <li key={item.product.ean} className="flex p-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.picture}
                            alt={item.product.fullname}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.fullname}>
                                  {item.product.name}
                                </a>
                              </h3>
                              <p className="ml-4">{item.product.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Quantidade {item.quantity}
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-primary-blue hover:text-indigo-500"
                                onClick={() => {
                                  removeItem(item.product);
                                }}
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Informações do Pagamento
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Segue os itens em seu carrinho
              </p>
            </div>
            <fieldset>
              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-medium">
                  Método de pagamento
                </legend>
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={paymentData.paymentMethodname === "pix"}
                      onChange={handlePaymentMethodChange}
                      className="form-radio text-blue-500 h-4 w-4 mr-2"
                    />
                    <span className="text-gray-700">PIX</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentData.paymentMethodname === "card"}
                      onChange={handlePaymentMethodChange}
                      className="form-radio text-blue-500 h-4 w-4 mr-2"
                    />
                    <span className="text-gray-700">Cartão</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={paymentData.paymentMethodname === "boleto"}
                      onChange={handlePaymentMethodChange}
                      className="form-radio text-blue-500 h-4 w-4 mr-2"
                    />
                    <span className="text-gray-700">Boleto</span>
                  </label>
                </div>
              </fieldset>
            </fieldset>
            {paymentData.paymentMethodname === "pix" && (
              <label>
                Chave PIX:
                <input
                  type="text"
                  name="pixKey"
                  value={pix?.pixKey}
                  onChange={handleChange}
                />
              </label>
            )}{" "}
            {paymentData.paymentMethodname === "card" && (
              <>
                <div className="mb-4">
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    value={card.cardNumber}
                    onChange={(event) =>
                      setCard({
                        ...card,
                        cardNumber: event.target.value,
                      })
                    }
                    id="cardNumber"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cardName">Nome impresso no cartão</label>
                  <input
                    type="text"
                    value={card.cardName}
                    onChange={(event) =>
                      setCard({
                        ...card,
                        cardName: event.target.value,
                      })
                    }
                    id="cardName"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cardExpiry">Validade</label>
                  <InputMask
                    mask="99/99"
                    value={card.cardExpiration}
                    onChange={(event) =>
                      setCard({
                        ...card,
                        cardExpiration: event.target.value,
                      })
                    }
                    id="cardExpiry"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cardCvv">CVV</label>
                  <InputMask
                    mask="999"
                    value={card.cardCvv}
                    onChange={(event) =>
                      setCard({
                        ...card,
                        cardCvv: event.target.value,
                      })
                    }
                    id="cardCvv"
                  />
                </div>
              </>
            )}
            {paymentData.paymentMethodname === "boleto" && (
              <label>
                Endereço de email para envio do boleto:
                <input
                  type="email"
                  name="boletoEmail"
                  value={boleto?.boletoEmail}
                  onChange={(event) => {
                    setBoleto({ ...boleto, boletoEmail: event.target.value });
                    handleChange;
                  }}
                />
              </label>
            )}
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
              Pagar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
