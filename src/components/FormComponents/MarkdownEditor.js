import MdEditor, { Plugins } from "react-markdown-editor-lite";
import { marked } from "marked";
import { Controller } from "react-hook-form";

const MarkdownEditor = ({ name, control, isReadOnly }) => {
  MdEditor.unuse(Plugins.Header);
  MdEditor.unuse(Plugins.FontStrikethrough);
  MdEditor.unuse(Plugins.BlockQuote);
  MdEditor.unuse(Plugins.BlockWrap);
  MdEditor.unuse(Plugins.BlockCodeInline);
  MdEditor.unuse(Plugins.BlockCodeBlock);
  MdEditor.unuse(Plugins.Image);
  MdEditor.unuse(Plugins.FullScreen);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <MdEditor
          style={{ width: `100%`, height: `300px` }}
          renderHTML={(text) => marked.parse(text)}
          value={value}
          onChange={(value) => onChange(value.text)}
          onBlur={onBlur}
          view={{ menu: true, md: true, html: false }}
          readOnly={isReadOnly}
        />
      )}
    />
  );
};

export default MarkdownEditor;
