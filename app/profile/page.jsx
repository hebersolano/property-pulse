import Image from "next/image";

import profileDefault from "@/assets/images/profile.png";
import UserListings from "@/components/user/UserListings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const profileImg = session?.user?.image || profileDefault;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImg}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <UserListings userId={session.user.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
