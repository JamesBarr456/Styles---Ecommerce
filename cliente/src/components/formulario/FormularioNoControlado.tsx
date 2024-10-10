import { registerUser } from "@/services/users";

export const FormularioNoControlado = () => {
  const handleSubmit = async (formData: FormData) => {
    const userData = {
      first_name: formData.get("first_name")?.toString() || "",
      last_name: formData.get("last_name")?.toString() || "",
      dni: formData.get("dni")?.toString() || "",
      number_phone: formData.get("number_phone")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    try {
      await registerUser(userData);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form
      action={handleSubmit}
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
          pattern="/^\d+$/"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          type="password"
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$"
          minLength={6}
          maxLength={10}
          required
        />
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
