import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "./Base";
import  useToggleModal  from "../../hooks/useToggleModel";
import { FaEdit } from "react-icons/fa";

const UpdateDeveloperProfileModel = ({companyId, profile}) => {
  const [isOpen, toggleModal] = useToggleModal();
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: profile.name,
      email: profile.email,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
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
      .put(`/api/v1/companies/profiles/${companyId}`, {
        company: {
          name: values.name,
          email: values.email,
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
                htmlFor="name"
              >
                Name
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.name}
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
 
export default UpdateDeveloperProfileModel;