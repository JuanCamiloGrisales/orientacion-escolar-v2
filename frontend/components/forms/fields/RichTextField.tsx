
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { RichTextFieldProps } from "./types";

export function RichTextField({ value, onChange }: RichTextFieldProps) {
  return (
    <div className="rounded-xl border-2 border-indigo-100 focus-within:border-indigo-300 transition-all">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        config={{
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}