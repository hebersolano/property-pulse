"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import FormRow from "./FormRow";
import { addProperty, editProperty, getProperty } from "@/config/services/propertiesApi";
import LoadingPage from "@/app/loading";

const requiredField = { required: "This field is required" };

function PropertyAddForm({ editMode = false, propertyId }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm(editMode ? { defaultValues: getProperty.bind(null, propertyId) } : {});

  async function onSubmit(data) {
    if (editMode) {
      const res = await editProperty(data);
      if (!res) return;
      router.push(`/properties/${propertyId}`);
      toast.success("Property updated");
    }

    const res = await addProperty(data);
    router.push(`/properties/${res._id}`);
  }

  console.log(errors);

  if (isLoading) return <LoadingPage />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type<span className="text-gray-400">*</span>
        </label>
        <select
          id="type"
          name="type"
          defaultValue="Apartment"
          {...register("type", requiredField)}
          className="border rounded w-full py-2 px-3"
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
        {errors.type && <span className="text-red-700">{errors.type}</span>}
      </div>

      <FormRow label="Listing Name" errors={errors} required={true}>
        <input
          type="text"
          id="name"
          name="name"
          {...register("name", requiredField)}
          placeholder="eg. Beautiful Apartment In Miami"
        />
      </FormRow>

      <FormRow label="Description">
        <textarea
          id="description"
          name="description"
          {...register("description")}
          rows="4"
          placeholder="Add an optional description of your property"
        ></textarea>
      </FormRow>

      <div className="mb-4 bg-blue-50 p-4">
        <FormRow label="Location" rowStyle="mb-2">
          <input
            type="text"
            id="street"
            name="location.street"
            {...register("location.street")}
            placeholder="Street"
          />
        </FormRow>

        <FormRow rowStyle="mb-2" errors={errors} required={true}>
          <input
            type="text"
            id="city"
            name="location.city"
            {...register("location.city", requiredField)}
            placeholder="City"
          />
        </FormRow>

        <FormRow rowStyle="mb-2" errors={errors} required={true}>
          <input
            type="text"
            id="state"
            name="location.state"
            {...register("location.state", requiredField)}
            placeholder="State"
          />
        </FormRow>

        <FormRow rowStyle="mb-2" errors={errors} required={true}>
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            {...register("location.zipcode", requiredField)}
            placeholder="Zipcode"
          />
        </FormRow>
      </div>

      <div className="mb-4 flex flex-wrap">
        <FormRow rowStyle="w-full sm:w-1/3 pr-2" label="Beds">
          <input
            type="number"
            id="beds"
            name="beds"
            defaultValue={0}
            min={0}
            {...register("beds", {
              valueAsNumber: true,
              min: { value: 0, message: "Negative numbers not allowed" },
            })}
          />
        </FormRow>

        <FormRow rowStyle="w-full sm:w-1/3 pr-2" label="Baths">
          <input
            type="number"
            id="baths"
            name="baths"
            defaultValue={0}
            min={0}
            {...register("baths", {
              valueAsNumber: true,
              min: { value: 0, message: "Negative numbers not allowed" },
            })}
          />
        </FormRow>

        <FormRow rowStyle="w-full sm:w-1/3 pr-2" label="Square Feet">
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            min={0}
            defaultValue={0}
            {...register("square_feet", {
              valueAsNumber: true,
              min: { value: 0, message: "Negative numbers not allowed" },
            })}
          />
        </FormRow>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              {...register("amenities")}
              value="Wifi"
              className="mr-2"
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              {...register("amenities")}
              value="Full Kitchen"
              className="mr-2"
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              {...register("amenities")}
              value="Washer & Dryer"
              className="mr-2"
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              {...register("amenities")}
              value="Free Parking"
              className="mr-2"
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              {...register("amenities")}
              value="Swimming Pool"
              className="mr-2"
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              {...register("amenities")}
              value="Hot Tub"
              className="mr-2"
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              {...register("amenities")}
              value="24/7 Security"
              className="mr-2"
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              {...register("amenities")}
              value="Wheelchair Accessible"
              className="mr-2"
            />
            <label htmlFor="amenity_wheelchair_accessible">Wheelchair Accessible</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              {...register("amenities")}
              value="Elevator Access"
              className="mr-2"
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              {...register("amenities")}
              value="Dishwasher"
              className="mr-2"
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              {...register("amenities")}
              value="Gym/Fitness Center"
              className="mr-2"
            />
            <label htmlFor="amenity_gym_fitness_center">Gym/Fitness Center</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              {...register("amenities")}
              value="Air Conditioning"
              className="mr-2"
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              {...register("amenities")}
              value="Balcony/Patio"
              className="mr-2"
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              {...register("amenities")}
              value="Smart TV"
              className="mr-2"
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              {...register("amenities")}
              value="Coffee Maker"
              className="mr-2"
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <FormRow rowStyle="flex items-center" label="Weekly">
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              min={0}
              defaultValue={0}
              {...register("rates.weekly", {
                valueAsNumber: true,
                min: { value: 0, message: "Negative numbers not allowed" },
              })}
            />
          </FormRow>

          <FormRow rowStyle="flex items-center" label="Monthly">
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              min={0}
              defaultValue={0}
              {...register("rates.monthly", {
                valueAsNumber: true,
                min: { value: 0, message: "Negative numbers not allowed" },
              })}
            />
          </FormRow>

          <FormRow rowStyle="flex items-center" label="Nightly">
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              min={0}
              defaultValue={0}
              {...register("rates.nightly", {
                valueAsNumber: true,
                min: { value: 0, message: "Negative numbers not allowed" },
              })}
            />
          </FormRow>
        </div>
      </div>

      <FormRow rowStyle="mb-4" label="Seller name">
        <input
          type="text"
          id="seller_name"
          {...register("seller_info.name")}
          name="seller_info.name"
          placeholder="Name"
        />
      </FormRow>

      <FormRow rowStyle="mb-4" label="Seller email">
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          {...register("seller_info.email")}
          placeholder="Email address"
        />
      </FormRow>

      <FormRow rowStyle="mb-4" label="Seller Phone  ">
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          {...register("seller_info.phone")}
          placeholder="Phone"
        />
      </FormRow>

      {!editMode && (
        <FormRow rowStyle="mb-4" label="Images (Select up to 4 images)">
          <input
            type="file"
            id="images"
            {...register("images", { required: true })}
            name="images"
            accept="image/*"
            multiple
          />
        </FormRow>
      )}

      <div className="flex gap-2 mt-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2   px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {editMode ? "Update Property" : "Add Property"}
        </button>
        <button
          onClick={() => reset()}
          className="bg-blue-100 hover:text-white hover:bg-blue-500 text-blue-600 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default PropertyAddForm;
