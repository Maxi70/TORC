import { useState } from "react";

import { ReactComponent as Plus } from "images/new/plus.svg";
import CreateEdit from "./CreateEdit";
import WorkExperience from "./WorkExperience";
import DeleteConfirmation from "../DeleteConfirmation";
import { formatDate } from "../utils";

const Career = ({ save, workExperiences }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);

  const onEditClick = (id) => {
    setIsEditing(true);
    setCurrentExperience(id);
  };

  const onCreate = async (data) => {
    try {
      setIsLoading(true);
      const newWorkExperiences = [...workExperiences, data];

      formatDate(data);

      save({ careers: newWorkExperiences });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAddNew(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const newWorkExperiences = workExperiences.filter(
        (exp) => exp.id !== currentExperience
      );

      save({ careers: newWorkExperiences });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
      setCurrentExperience(null);
    }
  };

  const onEdit = async (data) => {
    try {
      setIsLoading(true);

      formatDate(data);

      const index = workExperiences.findIndex(
        (exp) => exp.id === currentExperience
      );
      const newWorkExperiences = [...workExperiences];
      newWorkExperiences[index] = data;

      save({ careers: newWorkExperiences });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setCurrentExperience(null);
    }
  };

  const onClickDelete = (id) => {
    setCurrentExperience(id);
    setIsDeleting(true);
  };

  const currentExperienceObject = workExperiences.find(
    (exp) => exp.id === currentExperience
  );

  return (
    <>
      <div className="bg-white px-16 py-10 rounded-xs mb-10">
        <div className="flex justify-between items-center mb-2">
          <h5>Career</h5>
          <div
            className="flex gap-2 items-center b3 text-brandSecondary cursor-pointer"
            onClick={() => setAddNew(true)}
          >
            <Plus />
            Add new
          </div>
        </div>
        <div className="b3 mb-4">
          Share your work experience - full-time, part-time, freelance, anything
        </div>
        {workExperiences?.length === 0 ? (
          <div
            className="flex gap-2 items-center b3 text-brandSecondary cursor-pointer"
            onClick={() => setAddNew(true)}
          >
            <Plus />
            Add new
          </div>
        ) : (
          workExperiences?.map((experience, index) => (
            <WorkExperience
              onDelete={onClickDelete}
              onEdit={onEditClick}
              experience={experience}
              last={workExperiences.length === index + 1}
            />
          ))
        )}
      </div>
      {addNew && (
        <CreateEdit
          onSubmit={onCreate}
          isLoading={isLoading}
          handleClose={() => setAddNew(false)}
        />
      )}
      {isEditing && (
        <CreateEdit
          isLoading={isLoading}
          onSubmit={onEdit}
          experience={currentExperienceObject}
          handleClose={() => setIsEditing(false)}
        />
      )}
      {isDeleting && currentExperienceObject?.title && (
        <DeleteConfirmation
          isLoading={isLoading}
          title={currentExperienceObject?.title}
          handleDelete={onDelete}
          handleClose={() => setIsDeleting(false)}
        />
      )}
    </>
  );
};

export default Career;
