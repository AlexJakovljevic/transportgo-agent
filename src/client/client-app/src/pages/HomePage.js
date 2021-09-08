import people from "../assets/people.jpg"
import truckPicture1 from "../assets/truck1.jpg"
import truckPicture3 from "../assets/truck3.jpg"

function HomePage() {
  const firstText =
    "We strive to connect the best with the best and create a unique platform that helps you deliver fast and make deliveries even faster with the help of our team.";

  const loremIpusm =
    "Ted volutpat tortor eget urna congue bibendum. Integer eget urna risus. Etiam ut quam magna. In dictum ante ut dapibus tincidunt. Nulla pharetra porta ante, quis gravida orci dictum eu. Proin placerat, metus imperdiet porta pulvinar, eros libero mollis nisi, nec sollicitudin eros arcu et urna.";

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-24 h-full bg-green-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              TransportGo - cargo transport of the future
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
              {firstText}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={people}
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Make demands fast and easy
            </h2>
            <p className="text-base leading-relaxed mt-2">{loremIpusm}</p>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={truckPicture3}
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Get the best price
            </h2>
            <p className="text-base leading-relaxed mt-2">{loremIpusm}</p>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={truckPicture1}
              ></img>
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Offer the best deal
            </h2>
            <p className="text-base leading-relaxed mt-2">{loremIpusm}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
