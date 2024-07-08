import Image from "next/image";

import profileDefault from "@/assets/images/profile.png";
import UserListings from "@/components/user/UserListings";
import getUserSession from "@/config/userSessionServer";

async function ProfilePage() {
  const session = await getUserSession();
  const profileImg = session?.user?.image || profileDefault;
  const profileName = session?.user?.username;
  const profileEmail = session?.user?.email;

  return (
    <section className="bg-blue-50 flex flex-1">
      <div className="container mx-auto mt-24">
        <div className="bg-white mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 m-4">
              {/* profile */}
              <div className="overflow-hidden  rounded-lg border">
                <div className="px-4 py-5 sm:px-6 ">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto"
                    src={profileImg}
                    alt="User"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className=" font-medium text-gray-500">Username: </dt>
                      <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">{profileName}</dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className=" font-medium text-gray-500">Email:</dt>
                      <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">{profileEmail}</dd>
                    </div>
                    {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className=" font-medium text-gray-500">Phone number</dt>
                      <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                        (123) 456-7890
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className=" font-medium text-gray-500">Address</dt>
                      <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                        123 Main St
                        <br />
                        Anytown, USA 12345
                      </dd>
                    </div> */}
                  </dl>
                </div>
              </div>
            </div>

            <UserListings userId={session.user.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
