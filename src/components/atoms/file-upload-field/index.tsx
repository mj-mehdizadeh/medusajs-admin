import clsx from "clsx"
import React, { useRef, useState } from "react"
import { Translation, useTranslation } from "react-i18next"

type FileUploadFieldProps = {
  onFileChosen: (files: File[]) => void
  filetypes: string[]
  errorMessage?: string
  placeholder?: React.ReactElement | string
  className?: string
  multiple?: boolean
  text?: React.ReactElement | string
}

const defaultText = (
  <Translation>
    {(t) => (
      <span>
        {t("Drop your images here, or")}{" "}
        <span className="text-violet-60">{t("click to browse")}</span>
      </span>
    )}
  </Translation>
)

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onFileChosen,
  filetypes,
  errorMessage,
  className,
  text = defaultText,
  placeholder = "",
  multiple = false,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileUploadError, setFileUploadError] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList) {
      onFileChosen(Array.from(fileList))
    }
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setFileUploadError(false)

    e.preventDefault()

    const files: File[] = []

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          const file = e.dataTransfer.items[i].getAsFile()
          if (file && filetypes.indexOf(file.type) > -1) {
            files.push(file)
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        if (filetypes.indexOf(e.dataTransfer.files[i].type) > -1) {
          files.push(e.dataTransfer.files[i])
        }
      }
    }
    if (files.length === 1) {
      onFileChosen(files)
    } else {
      setFileUploadError(true)
    }
  }

  return (
    <div
      onClick={() => inputRef?.current?.click()}
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
      className={clsx(
        "inter-base-regular flex h-full w-full cursor-pointer select-none flex-col items-center justify-center rounded-rounded border-2 border-dashed border-grey-20 text-grey-50 transition-colors hover:border-violet-60 hover:text-grey-40",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <p>{text}</p>
        {placeholder}
      </div>
      {fileUploadError && (
        <span className="text-rose-60">
          {errorMessage || t("Please upload an image file")}
        </span>
      )}
      <input
        ref={inputRef}
        accept={filetypes.join(", ")}
        multiple={multiple}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default FileUploadField
