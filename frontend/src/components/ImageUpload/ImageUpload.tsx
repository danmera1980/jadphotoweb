import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void; // New prop to pass selected files
  clearFiles: boolean;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFilesSelected,
  clearFiles,
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (clearFiles) {
      setPreviewUrls([]);
    }
  }, [clearFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviewUrls = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <p>
          Arrastrar las fotos aquí, o hacer click para seleccionar las fotos.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="object-cover w-full h-32 rounded-md"
            />
            <button
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUploader;
