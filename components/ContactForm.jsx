"use client";

import { useForm } from "react-hook-form";
import FormRow from "./FormRow";

const requiredField = { required: "This field is required" };

function ContactForm({ property }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm();

  function onSubmit(data) {
    data.recipient = property.owner;
    data.property = property._id;
    console.log(data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Name:" rowStyle="mb-4" labelStyle="text-sm" errors={errors} required={true}>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", requiredField)}
            placeholder="Enter your name"
          />
        </FormRow>

        <FormRow
          label="Email:"
          rowStyle="mb-4"
          labelStyle="text-sm"
          errors={errors}
          required={true}
        >
          <input
            type="text"
            id="email"
            name="email"
            {...register("email", requiredField)}
            placeholder="Enter your name"
          />
        </FormRow>

        <FormRow label="Phone:" rowStyle="mb-4" labelStyle="text-sm" errors={errors}>
          <input
            type="text"
            id="phone"
            name="phone"
            {...register("phone")}
            placeholder="Enter your name"
          />
        </FormRow>

        <FormRow label="Message:" labelStyle="mb-4" required={true} errors={errors}>
          <textarea
            id="message"
            name="message"
            {...register("message", requiredField)}
            rows="4"
            placeholder="Enter your message"
          ></textarea>
        </FormRow>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
          >
            <i className="fas fa-paper-plane mr-2"></i> Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
