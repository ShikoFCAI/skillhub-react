import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";
import UpdateDeveloperProfileModel from "../../components/models/UpdateDeveloperModel";
import {TbWorld} from "react-icons/tb";
import {FaFacebook, FaGithub, FaLinkedin, FaStackOverflow, FaTwitter} from "react-icons/fa";

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
        .get(`/api/v1/profiles/${token.id}`)
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
              {profile?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="bg-gray-300 w-full rounded-md flex justify-between py-10 px-10">
              <div>
                <div className="flex items-center gap-x-2 mb-4">
                  <div className="text-gray-500 text-xl font-semibold">Name : </div>
                  <div className="text-green-600 text-2xl font-bold mt-1">{profile?.username}</div>
                </div>
                <div className="flex gap-x-2">
                  <div className="text-gray-500 text-xl font-semibold">E-mail : </div>
                  <div className="text-gray-600 text-xl font-bold">{profile?.email}</div>
                </div>
                <div className="flex gap-x-2 mt-4">
                  <div className="text-gray-500 text-xl font-semibold">Study at : </div>
                  <div className="text-gray-600 text-xl font-bold">{profile?.study_at}</div>
                </div>
                <div className="flex gap-x-2 mt-4">
                  <div className="text-gray-500 text-xl font-semibold">Work at : </div>
                  <div className="text-gray-600 text-xl font-bold">{profile?.work_at}</div>
                </div>
                <div className="gap-y-2 mt-4">
                  <div className="text-gray-500 text-xl font-semibold">Bio</div>
                  <div className="text-gray-600 text-xl bg-gray-200 mt-2 p-4 rounded">{profile?.bio}</div>
                </div>
                <div className="text-gray-700 text-3xl gap-x-6 flex justify-center items-center mt-6">
                  <a
                    href={profile?.bersonal_website_link}
                    target="blank"
                  >
                    <TbWorld />
                  </a>

                  <a
                    href={profile?.facebook_link}
                    target="blank"
                  >
                    <FaFacebook />
                  </a>
                  
                  <a
                    href={profile?.github_link}
                    target="blank"
                  >
                    <FaGithub />
                  </a>
                  
                  <a
                    href={profile?.linkedin_link}
                    target="blank"
                  >
                    <FaLinkedin />
                  </a>

                  <a
                    href={profile?.stackoverflow_link}
                    target="blank"
                  >
                    <FaStackOverflow />
                  </a>
                  
                  <a
                    href={profile?.twitter_link}
                    target="blank"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
              <div>
                <UpdateDeveloperProfileModel 
                  DeveloperId={token.id}
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