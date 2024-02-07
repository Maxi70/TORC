const getCurrentClass = (step, currentSubStep) =>
  step === currentSubStep
    ? "min-h-[100vh] !pb-48 flex flex-col justify-center"
    : "pt-20";

export default getCurrentClass;

export const LANG_PROFICIENCY = {
  BASIC: `I am able to satisfy routine travel needs and minimum courtesy
  requirements. I can read some personal and place names, street
  signs, office and shop designations, numbers and isolated
  words and phrases.`,
  CONVERSATIONAL: `I am able to satisfy routine social demands and limited work
  requirements. I can read simple paragraphs on subjects within
  a familiar context.`,
  FLUENT: `I am able to speak the language with sufficient structural
  accuracy and vocabulary to participate effectively in most
  formal and informal conversations on practical, social, and
  professional topics. I can read standard newspaper items
  addressed to the general reader, routine correspondence,
  reports, and technical materials in my field of work.`,
  NATIVE: `I am able to speak, read, and write the language equivalent to
  that of an educated native speaker.`,
};
