import Button from "./Icons/Buttons";

function Login(props) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 pb-48 mx-auto flex flex-wrap items-center">
        <div className="lg:w-1/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Explore the vast posibilities of fast and reliable transport
          </h1>
          <p className="leading-relaxed mt-4">
            Integer eget urna risus. Etiam ut quam magna. In dictum ante ut
            dapibus tincidunt. Nulla pharetra porta ante, quis gravida orci
            dictum eu
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>

          <form>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              {" "}
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <Button text="Login"></Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
