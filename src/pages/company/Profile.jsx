import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";
import UpdateCompanyProfileModel from "../../components/models/UpdateCompanyProfileModel";

const Profile = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    if(token){
      axios
        .get(`/api/v1/companies/profiles/${token.id}`)
        .then((Response) => {
          setProfile(Response.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [token]);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10 mt-10">
        <div>
          {!profile && (
            <div className="flex items-center justify-center py-10 w-full">
              <Loader />
            </div>
          )}
        </div>

        {profile && (
          <div className="flex w-full gap-x-8">
            <div className="bg-gray-300 text-green-600 w-fit h-fit text-9xl rounded-md flex justify-center items-center pb-4 px-4">
              {profile?.name?.charAt(0)}
            </div>
            <div className="bg-gray-300 w-full rounded-md flex justify-between py-10 px-10">
              <div>
                <div className="flex items-center gap-x-2 mb-6">
                  <div className="text-gray-500 text-2xl font-semibold">Name : </div>
                  <div className="text-green-600 text-3xl font-bold mt-1">{profile?.name}</div>
                </div>
                <div className="flex gap-x-2">
                  <div className="text-gray-500 text-2xl font-semibold">E-mail : </div>
                  <div className="text-gray-600 text-2xl font-bold">{profile?.email}</div>
                </div>
              </div>
              <div>
                <UpdateCompanyProfileModel 
                  companyId={token.id}
                  profile={profile}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default Profile;