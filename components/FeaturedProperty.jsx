import { getRateDisplay } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaBath, FaBed, FaMapMarker, FaMoneyBill, FaRulerCombined } from "react-icons/fa";

function FeaturedProperty({ property }) {
  const rateDisplay = getRateDisplay(property.rates);

  return (
    <div class="rounded-xl shadow-md relative bg-white flex flex-col md:flex-row">
      <Image
        src={`/images/properties/${property.images[0]}`}
        alt={`${property.name} photo`}
        class="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
        width={9}
        height={16}
      />
      <div class="p-6">
        <h3 class="text-xl font-bold">{property.name}</h3>
        <div class="text-gray-600 mb-4">{property.name}</div>
        <h3 class="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${rateDisplay}
        </h3>
        <div class="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" /> {property.beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {property.baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div class="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Monthly
            </p>
          )}
        </div>

        <div class="border border-gray-200 mb-5"></div>

        <div class="flex flex-col lg:flex-row justify-between">
          <div class="flex align-middle gap-2 mb-4 lg:mb-0">
            <i class="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span class="text-orange-700">
              {" "}
              {property.location.city + " " + property.location.state}{" "}
            </span>
          </div>
          <Link
            href="/property"
            class="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperty;
