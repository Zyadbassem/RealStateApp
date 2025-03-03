import InputField from "../components/InputField";

function SignUp() {
  return (
    <form
      className="
        flex
        flex-col
        items-center
        gap-3
        w-[100%]
        max-w-[400px]
        p-2
        justify-between 
        mx-auto
        mt-[5%]"
    >
      <h1 className="text-2xl">Sign Up</h1>
      <InputField
        label="username"
        name="username"
        placeholder="johnMono"
        type="text"
        value=""
      />
      <InputField
        label="email"
        name="email"
        placeholder="johnMono@gmail.com"
        type="text"
        value=""
      />
      <InputField
        label="password"
        name="password"
        placeholder="johnMono01_"
        type="password"
        value=""
      />
      <button
        type="submit"
        className="bg-blue-600 w-[98%] p-2 rounded-sm text-white"
      >
        Sign Up
      </button>
      <a
        href="https://google.com"
        className="bg-red-600 w-[98%] p-2 rounded-sm text-white text-center"
      >
        Continue with google
      </a>
    </form>
  );
}

export default SignUp;
