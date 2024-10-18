import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  clearFiles: boolean;
  onUploadProgress: (progress: number) => void; // Add this prop
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  clearFiles,
  onUploadProgress,
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0); // Declare progress state

  useEffect(() => {
    if (clearFiles) {
      setPreviewUrls([]);
      setProgress(0); // Reset progress when clearing files
    }
  }, [clearFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviewUrls = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

      // Pass files to the parent component
      onUpload(acceptedFiles);
    },
    [onUpload]
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

  // Update progress based on the prop received
  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
    onUploadProgress(newProgress); // Notify the parent component about the progress
  };

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

      {/* Add a loading bar or progress indicator here */}
      <div className="mt-4">
        {/* Example loading bar */}
        <div className="bg-gray-300 h-2 rounded-full">
          <div
            className="bg-blue-600 h-full rounded-full"
            style={{ width: `${progress}%` }} // Bind width to progress
          />
        </div>
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
