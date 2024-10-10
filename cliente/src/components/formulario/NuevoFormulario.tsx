import { registerUser } from "@/services/users";
import { useState } from "react";

export const NuevoFormulario = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dni: "",
    number_phone: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          First Name
        </label>
        <input
          id="first_name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last Name
        </label>
        <input
          id="last_name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="dni"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          DNI
        </label>
        <input
          id="dni"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="number"
          name="dni"
          value={formData.dni}
          onChange={handleInputChange}
          pattern="/^\d+$/"
          minLength={7}
          maxLength={8}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="number_phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          id="number_phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="text"
          name="number_phone"
          value={formData.number_phone}
          onChange={handleInputChange}
          minLength={7}
          maxLength={15}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          className="w-full invalid:border-red-500 peer px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$"
          minLength={6}
          maxLength={10}
          required
        />
        <span className="peer-invalid:flex hidden peer-invalid:text-red-500">
          Insert password valido
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};
