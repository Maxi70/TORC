import { useEffect } from "react";

/**
 * hook that allows a script to be loaded on mount. Removes script on cleanup.
 * @param {string} resourceUrl - a url containing the resource to be loaded by the hook on mount.
 * */

const useImportScript = (resourceUrl) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [resourceUrl]);
};

export default useImportScript;
