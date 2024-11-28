// FileInput.tsx
import React, { useState } from "react";

interface FileInputProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ id, onChange, multiple }) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (e.target.files) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setFileNames(names);
    } else {
      setFileNames([]);
    }
  };

  return (
    <div>
      <input type="file" id={id} onChange={handleChange} multiple={multiple} />
      {fileNames.map((name, i) => (
        <p key={i}>{name}</p>
      ))}
    </div>
  );
};

export default FileInput;
