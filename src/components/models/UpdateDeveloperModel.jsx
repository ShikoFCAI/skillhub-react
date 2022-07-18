import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "./Base";
import  useToggleModal  from "../../hooks/useToggleModel";
import { FaEdit } from "react-icons/fa";

const UpdateDeveloperModel = ({profile, DeveloperId}) => {
  const [isOpen, toggleModal] = useToggleModal();
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: profile.username,
      email: profile.email,
      bio: profile.bio,
      facebook_link: profile.facebook_link,
      twitter_link: profile.twitter_link,
      github_link: profile.github_link,
      stackoverflow_link: profile.stackoverflow_link,
      linkedin_link: profile.linkedin_link,
      bersonal_website_link: profile.bersonal_website_link,
      study_at: profile.study_at,
      work_at: profile.work_at,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await handleSubmit(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSubmit = (values) => {
    setDisabled(true);
    axios
      .put(`/api/v1/profiles/${DeveloperId}`, {
        developer: {
          username: values.username,
          email: values.email,
          bio: values.bio,
          facebook_link: values.facebook_link,
          twitter_link: values.twitter_link,
          github_link: values.github_link,
          stackoverflow_link: values.stackoverflow_link,
          linkedin_link: values.linkedin_link,
          bersonal_website_link: values.bersonal_website_link,
          study_at: values.study_at,
          work_at: values.work_at
        }
      })
      .then((response) => {
        toggleModal();
        document.location.reload(true);
        toast.success("Update Profile Successfully");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Failed to Update Profile");
        setDisabled(false);
      });
  };

  return ( 
    <div>
      <button 
        className="text-green-700 text-xl"
        onClick={toggleModal}
      >
        <FaEdit />
      </button>

      <Modal title="Update Profile" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="username"
              >
                Name
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="email"
                id="email"
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
              />
              {formik.touched.bio && formik.errors.bio ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.bio}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="facebook_link"
              >
                Facebook Link
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="facebook_link"
                onChange={formik.handleChange}
                value={formik.values.facebook_link}
              />
              {formik.touched.facebook_link && formik.errors.facebook_link ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.facebook_link}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="twitter_link"
              >
                Twitter Link
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="twitter_link"
                onChange={formik.handleChange}
                value={formik.values.twitter_link}
              />
              {formik.touched.twitter_link && formik.errors.twitter_link ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.twitter_link}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="github_link"
              >
                Github Link
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="github_link"
                onChange={formik.handleChange}
                value={formik.values.github_link}
              />
              {formik.touched.github_link && formik.errors.github_link ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.github_link}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="stackoverflow_link"
              >
                Stackoverflow Link
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="stackoverflow_link"
                onChange={formik.handleChange}
                value={formik.values.stackoverflow_link}
              />
              {formik.touched.stackoverflow_link && formik.errors.stackoverflow_link ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.stackoverflow_link}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="linkedin_link"
              >
                Linkedin Link
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="linkedin_link"
                onChange={formik.handleChange}
                value={formik.values.linkedin_link}
              />
              {formik.touched.linkedin_link && formik.errors.linkedin_link ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.linkedin_link}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="bersonal_website_link"
              >
                personal Website Link
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="bersonal_website_link"
                onChange={formik.handleChange}
                value={formik.values.bersonal_website_link}
              />
              {formik.touched.bersonal_website_link && formik.errors.bersonal_website_link ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.bersonal_website_link}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="study_at"
              >
                Study at
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="study_at"
                onChange={formik.handleChange}
                value={formik.values.study_at}
              />
              {formik.touched.study_at && formik.errors.study_at ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.study_at}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="work_at"
              >
                Work at 
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="work_at"
                onChange={formik.handleChange}
                value={formik.values.work_at}
              />
              {formik.touched.work_at && formik.errors.work_at ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.work_at}
                </div>
              ) : null}
            </div>
            
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <button 
            className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold px-2 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none"
            type="submit" 
            onClick={() => formik.handleSubmit()} 
            disabled={disabled}
          >
            Update
          </button>
          <button 
            className="text-red-500 bg-white border-solid border-2 border-red-600 font-semibold px-2 py-1 rounded hover:text-red-300 hover:border-red-300 focus:outline-none"
            type="submit" 
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
 
export default UpdateDeveloperModel;