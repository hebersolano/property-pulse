import Image from "next/image";

function featuredProperty({ property }) {
  return (
    <div class="rounded-xl shadow-md relative bg-white flex flex-col md:flex-row">
      <Image
        src={`/images/properties/${property.images[0]}`}
        alt={`${property.name} photo`}
        class="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
        width={16}
        height={9}
      />
      <div class="p-6">
        <h3 class="text-xl font-bold">Seaside Retreat</h3>
        <div class="text-gray-600 mb-4">Condo</div>
        <h3 class="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          $2,500/wk
        </h3>
        <div class="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <i class="fa-solid fa-bed"></i> 4<span class="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <i class="fa-solid fa-bath"></i> 3<span class="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <i class="fa-solid fa-ruler-combined"></i>
            2,800 <span class="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div class="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <i class="fa-solid fa-money-bill"></i> Nightly
          </p>
          <p>
            <i class="fa-solid fa-money-bill"></i> Weekly
          </p>
        </div>

        <div class="border border-gray-200 mb-5"></div>

        <div class="flex flex-col lg:flex-row justify-between">
          <div class="flex align-middle gap-2 mb-4 lg:mb-0">
            <i class="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span class="text-orange-700"> Boston MA </span>
          </div>
          <a
            href="property.html"
            class="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default featuredProperty;
