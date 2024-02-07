import { useEffect, useState } from "react";
import classNames from "classnames";
import { API, graphqlOperation } from "aws-amplify";
import styles from "./index.module.css";

import closeIcon from "images/close-icon-blue.svg";
import Modal from "components/Modal";
import CustomInput from "components/CustomInput";
import moment from "moment";
import { listMatchNotes, listJobOpportunityNotes } from "graphql/queries";
import { createNote } from "graphql/mutations";
import { ReactComponent as NoteIcon } from "images/note.svg";
import MarkdownIt from "markdown-it";
import underline from "markdown-it-plugin-underline";
import Error from "components/FormComponentsNew/Error";

const mdParser = new MarkdownIt().use(underline);

const QUERY_MAP_LOOKUP = {
  listMatchNotes: { name: "listMatchNotes", query: listMatchNotes },
  listJobOpportunityNotes: {
    name: "listJobOpportunityNotes",
    query: listJobOpportunityNotes,
  },
};

function Note({ note }) {
  return (
    <div className="py-4">
      <p className="font-bold">@{note.creator}</p>
      <p className="text-gray-400">
        {moment(note.createdAt).format("YYYY-MM-DD")}
      </p>
      <p dangerouslySetInnerHTML={{ __html: mdParser.render(note.content) }} />
    </div>
  );
}

function NotesList({ notes }) {
  return notes.map((n) => <Note key={n.id} note={n} />);
}

function EmptyNote() {
  return <p className="text-gray-400">There are no notes to display</p>;
}

function Notes({
  applicationId,
  jobOpportunityId,
  onClose,
  name,
  isReadOnly,
  noteType,
  subTitle,
  title,
}) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    let promise;

    (async () => {
      setLoading(true);
      const params = {};

      if (applicationId && jobOpportunityId) {
        params.queryObj = QUERY_MAP_LOOKUP.listMatchNotes;
        params.payload = {
          applicationId,
          jobOpportunityId: { eq: jobOpportunityId },
        };
      } else if (jobOpportunityId) {
        params.queryObj = QUERY_MAP_LOOKUP.listJobOpportunityNotes;
        params.payload = {
          jobOpportunityId,
        };
        if (noteType) {
          params.payload.filter = { noteType: { eq: noteType } };
        }
      } else return;

      promise = API.graphql(
        graphqlOperation(params.queryObj.query, params.payload)
      );

      let res;

      try {
        res = await promise;
      } catch (err) {
        if (!API.isCancel(err)) {
          console.log("Error during fetching notes");
          console.log(err);
        }

        return;
      }

      const { compare } = Intl.Collator("en-US");

      const sortedNotes = res.data[params.queryObj.name].items.sort((a, b) =>
        compare(b.createdAt, a.createdAt)
      );

      setNotes(sortedNotes);
      setLoading(false);
    })();

    return () => {
      if (promise) {
        API.cancel(promise);
      }
    };
  }, [applicationId, jobOpportunityId, noteType]);

  const addNote = async () => {
    setError("");
    if (!newNote.trim().length) {
      return;
    }

    setSavingNote(true);

    const attrs = {
      content: newNote.trim(),
    };

    if (noteType) {
      attrs.noteType = noteType;
    }

    const payload = { input: {} };

    if (applicationId && jobOpportunityId) {
      payload.input = {
        applicationId,
        jobOpportunityId,
      };
    } else if (jobOpportunityId) {
      payload.input = {
        jobOpportunityId,
      };
    } else return;

    payload.input = { ...payload.input, ...attrs };

    let res;
    try {
      res = await API.graphql(
        graphqlOperation(createNote, {
          input: payload.input,
        })
      );
      setNewNote("");
      setNotes((prev) => [{ ...res.data.createNote }, ...prev]);
    } catch (err) {
      if (!API.isCancel(err)) {
        console.log("Error during creation of note");
        console.log(err);
        setError("Something went wrong during the creation of the note.");
      }
    }
    setSavingNote(false);
  };

  const onPrimaryAction = async () => {
    await addNote();
  };

  let notesContent;
  if (loading) {
    notesContent = (
      <div className="flex justify-center">
        <span className="loader"></span>
      </div>
    );
  } else if (!notes.length) {
    notesContent = <EmptyNote />;
  } else {
    notesContent = <NotesList notes={notes} />;
  }

  return (
    <div className="w-[32rem] md:w-[38rem]">
      <div className="z-50 absolute top-2 right-3">
        <img
          src={closeIcon}
          className="cursor-pointer"
          alt="close"
          onClick={onClose}
        />
      </div>
      <div
        className={classNames(
          "overflow-y-scroll h-full relative flex flex-col justify-between gap-0",
          styles.noScrollbar
        )}
      >
        {title && (
          <p
            className={classNames(
              "pt-10 px-8 font-nexa font-bold text-2xl text-electricBlue-500",
              { "mb-8": !subTitle }
            )}
          >
            {title}
          </p>
        )}
        {subTitle && (
          <p
            className={classNames(
              "px-8 font-nexa font-bold text-xl text-electricBlue-500 mb-4",
              { "pt-10": !title }
            )}
          >
            {subTitle}
          </p>
        )}
        {name && (
          <p className="pt-10 px-8 font-nexa font-bold text-2xl text-electricBlue-500 mb-8">
            Notes for {name}
          </p>
        )}
        <div className="px-8 overflow-y-auto h-96 divide-y">
          <CustomInput
            isTextarea
            notWizard
            autoResize
            isWizard
            value={newNote}
            onChange={setNewNote}
            capped={500}
          />
          {error && <Error className="!text-md !ml-0 mt-2" message={error} />}
          <div className="mt-6 border-white">
            {notes.length > 0 && (
              <p className="font-rubik-regular font-bold underline text-underline-offset-2">
                Previous Notes
              </p>
            )}
            {notesContent && <NotesList notes={notes} />}
          </div>
        </div>
        <div className="border-t border-gray-600 w-full pb-3">
          <div className="flex justify-between pt-6 font-rubik-regular font-bold w-full">
            {!isReadOnly && (
              <div className="flex ml-auto">
                <button
                  className={classNames(
                    "border-2 px-5 py-2 bg-electricBlue-500 border-electricBlue-500 text-white font-bold sm:text-sm text-xs ml-4 mr-4"
                  )}
                  style={{
                    borderRadius: "61px",
                    display: "flex",
                  }}
                  onClick={onPrimaryAction}
                  disabled={savingNote}
                >
                  {savingNote ? "Creating..." : "Create Note"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotesWrapper({
  applicationId,
  jobOpportunityId,
  className,
  name,
  Icon,
  isReadOnly,
  noteType,
  title,
  subTitle,
}) {
  const [displayNotes, setDisplayNotes] = useState(false);
  if (!applicationId && !jobOpportunityId) {
    return null;
  } else if (!jobOpportunityId) {
    return null;
  }

  return (
    <>
      <div className={className}>
        {Icon ? (
          <button
            onClick={() => setDisplayNotes(true)}
            className="cursor-default"
          >
            <Icon />
          </button>
        ) : (
          <NoteIcon
            className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-900"
            onClick={() => setDisplayNotes(true)}
          />
        )}
      </div>
      {displayNotes && (
        <Modal onClose={() => setDisplayNotes(false)}>
          <div className="h-full w-full md:h-5/6 lg:max-w-4xl bg-white rounded-none no-scrollbar overflow-hidden relative rounded_modal">
            <Notes
              jobOpportunityId={jobOpportunityId}
              applicationId={applicationId}
              name={name}
              onClose={() => setDisplayNotes(false)}
              isReadOnly={isReadOnly}
              noteType={noteType}
              subTitle={subTitle}
              title={title}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
