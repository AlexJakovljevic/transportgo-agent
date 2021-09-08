import LocationIcon from "../components/Icons/LocationIcon";

let demand = {
  id: "mydemand1",
  price: 100,
  expirationDate: "2021-09-08T18:27:04.841Z",
  name: "Cargo from England",
  cargoId: "cargo1",
  vehicleId: "car1",
  offerIds: ["offer 1", "offer2", "offer3"],
  loadingAddress: {
    country: "United Kingdom",
    state: "England",
    city: "London",
    zip: 123,
    streetLine1: "123 Street",
    streetLine2: "34",
  },
  unloadingAddress: {
    country: "Poland",
    state: "Poland",
    city: "Krako",
    zip: 0,
    streetLine1: "Street 123",
    streetLine2: "Ste1",
  },
  from: "United Kingdom",
  to: "Poland",
  numOfOffers: 3,
  expDate: 0,
  vehicle: "car1",
  title: "Cargo from England",
};

function DemandInfo(props) {
  return (
    <li class="flex -mx-4">
      <div class="px-4">
        <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
          <LocationIcon></LocationIcon>
        </span>
      </div>
      <div class="px-4">
        <h3 class="my-4 text-xl font-semibold dark:text-white">
          {props.title}
        </h3>
        <p class="text-gray-500 dark:text-gray-300 leading-loose">
          Country: props.country
        </p>
      </div>
    </li>
  );
}

function NewDemand(props) {
  return (
    <section>
      <div class="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800">
        <div class="flex flex-wrap -mx-8">
          <div class="w-full lg:w-1/2 px-8">
            <div class="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
              <h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading dark:text-white">
                {demand.title}
              </h2>
              <p class="mb-8 leading-loose text-gray-500 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                sagittis, quam nec venenatis lobortis, mi risus tempus nulla,
                sed porttitor est nibh at nulla. Praesent placerat enim ut ex
                tincidunt vehicula. Fusce sit amet dui tellus.
              </p>
              <div class="w-full md:w-1/3">
                <button
                  type="button"
                  class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  See more
                </button>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 px-8">
            <ul class="space-y-12">
              <DemandInfo title="Loading address" />
              <DemandInfo />
              <DemandInfo />
              <DemandInfo />
              <DemandInfo></DemandInfo>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewDemand;
