import React from "react"
import type { Toast } from "react-hot-toast"
import Spinner from "../spinner"
import ToasterContainer from "../toaster-container"
import { useTranslation } from "react-i18next"

type SavingStateProps = {
  toast: Toast
  title?: string
  message?: string
}

const SavingState: React.FC<SavingStateProps> = ({ toast, title, message }) => {
  const { t } = useTranslation()

  return (
    <ToasterContainer visible={toast.visible} className="w-[448px]">
      <div>
        <Spinner variant="secondary" size="large" />
      </div>
      <div className="ml-small mr-base flex flex-grow flex-col gap-y-2xsmall">
        <span className="inter-small-semibold">
          {title ? title : t("Saving changes")}
        </span>
        <span className="inter-small-regular text-grey-50">
          {message ? message : t("Hang on, this may take a few moments.")}
        </span>
      </div>
    </ToasterContainer>
  )
}

export default SavingState
