"use client";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import FormRow from "./FormRow";
import { postNewMessage } from "@/config/services/userApi";
import MiniSpinner from "./MiniSpinner";
import { useState } from "react";

const requiredField = { required: "This field is required" };

function ContactForm({ property, user }) {
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  async function onSubmit(data) {
    data.sender = user.id;
    data.recipient = property.owner;
    data.property = property._id;
    console.log(data);
    let res = await postNewMessage(data);
    setIsSent(res);
  }

  if (isSubmitting) return <MiniSpinner />;

  if (isSent)
    return (
      <div>
        <p className="mb-4 flex justify-center">
          <FaCheckCircle className="mr-2 text-green-500" /> Message was sent successfully
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="button"
          onClick={() => {
            reset();
            setIsSent(false);
          }}
        >
          <i className="fas fa-paper-plane mr-2"></i> Send Another Message
        </button>
      </div>
    );

  return (
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

      <FormRow label="Email:" rowStyle="mb-4" labelStyle="text-sm" errors={errors} required={true}>
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
          id="body"
          name="body"
          {...register("body", requiredField)}
          rows="4"
          placeholder="Enter your message"
        ></textarea>
      </FormRow>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="submit"
          disabled={isSubmitting}
        >
          <FaPaperPlane className="pr-2" /> Send Message
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
