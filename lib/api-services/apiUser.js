import toast from "react-hot-toast";

const NEXT_API = process.env.NEXT_PUBLIC_API || null;

export async function postNewMessage(message) {
  try {
    const res = await fetch(`${NEXT_API}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) {
      toast.error("Error sending the message");
      return false;
    }
    toast.success("Message sent successfully");
    return true;
  } catch (error) {
    console.error(error);
  }
}
