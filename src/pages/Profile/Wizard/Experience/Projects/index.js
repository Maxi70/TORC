import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Plus } from "images/new/plus.svg";
import CreateEdit from "./CreateEdit";
import RowItem from "./RowItem";
import DeleteConfirmation from "../DeleteConfirmation";
import { formatDate } from "../utils";

const Projects = ({ projects, save }) => {
  const [addNew, setAddNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCreate = async (data) => {
    try {
      setIsLoading(true);
      const updatedProjects = [...projects, data];

      formatDate(data);

      save({ projectsCaseStudies: updatedProjects });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAddNew(false);
    }
  };

  const openEditModal = (id) => {
    setIsEditing(true);
    setCurrentExperience(id);
  };

  const onEdit = async (data) => {
    try {
      setIsLoading(true);

      formatDate(data);

      const index = projects.findIndex((exp) => exp.id === currentExperience);
      const projectsCopy = [...projects];
      projectsCopy[index] = data;

      save({ projectsCaseStudies: projectsCopy });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setCurrentExperience(null);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const filteredProjects = projects.filter(
        (exp) => exp.id !== currentExperience
      );
      save({ projectsCaseStudies: filteredProjects });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
      setCurrentExperience(null);
    }
  };

  const openDeleteModal = (id) => {
    setIsDeleting(true);
    setCurrentExperience(id);
  };

  const currentProject = projects.find(
    (project) => project.id === currentExperience
  );

  return (
    <>
      <div className="bg-white px-16 py-10 rounded-xs">
        <div className="flex justify-between items-center mb-2">
          <h5>Projects and Case Studies</h5>
          <div
            className="flex gap-2 items-center b3 text-brandSecondary cursor-pointer"
            onClick={() => setAddNew(true)}
          >
            <Plus />
            Add new
          </div>
        </div>
        <div className="b3 mb-4">
          Share any case studies or projects that show off your skills,
          achievements, and personality
        </div>
        {projects.length === 0 ? (
          <div
            className="flex gap-2 items-center b3 text-brandSecondary cursor-pointer"
            onClick={() => setAddNew(true)}
          >
            <Plus />
            Add new
          </div>
        ) : (
          projects?.map((experience) => (
            <RowItem
              index={experience.id}
              key={uuidv4()}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              experience={experience}
            />
          ))
        )}
      </div>
      {addNew && (
        <CreateEdit
          isLoading={isLoading}
          onSubmit={onCreate}
          handleClose={() => setAddNew(false)}
        />
      )}
      {isEditing && currentProject?.id && (
        <CreateEdit
          isLoading={isLoading}
          onSubmit={onEdit}
          project={currentProject}
          handleClose={() => setIsEditing(false)}
        />
      )}
      {isDeleting && currentProject?.title && (
        <DeleteConfirmation
          isLoading={isLoading}
          title={currentProject?.title}
          handleClose={() => setIsDeleting(false)}
          handleDelete={onDelete}
        />
      )}
    </>
  );
};

export default Projects;
