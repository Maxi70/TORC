import { useEffect, useState } from "react";
import { cloneDeep, set } from "lodash";
import { API, graphqlOperation } from "aws-amplify";

const useEditing = (dataForEdit, pathParam, entity, mutateMethod) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mutatePayload, setMutatePayload] = useState(null);
  const [mutateError, setMutateError] = useState("");
  const [mutateSuccess, setMutateSuccess] = useState(false);

  useEffect(() => {
    const payload = set(cloneDeep(dataForEdit), pathParam, entity);

    setMutatePayload(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutate = async () => {
    setIsLoading(true);

    try {
      const res = await API.graphql(
        graphqlOperation(mutateMethod, {
          input: mutatePayload,
        })
      );

      setMutateSuccess(true);

      return res;
    } catch (error) {
      setMutateError(
        error?.errors?.[0]?.message || "Something went wrong, please try again."
      );
      setMutateSuccess(false);
    }

    setIsLoading(false);
  };

  const resetState = () => {
    setIsLoading(false);
    setMutatePayload(null);
    setMutateError("");
    setMutateSuccess(false);
  };

  return { mutate, resetState, isLoading, mutateSuccess, mutateError };
};

export default useEditing;
