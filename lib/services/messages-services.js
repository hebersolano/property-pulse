export async function getMessagesCount() {
  try {
    const session = await getUserSession();
    if (!session?.user) return 0;
    await dbConnect();
    const countMsg = await Message.countDocuments({ recipient: session.user.id, read: false });
    return Number(countMsg);
  } catch (error) {
    console.log(error);
  }
}
