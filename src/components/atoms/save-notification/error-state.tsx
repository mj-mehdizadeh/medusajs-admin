import React, { useEffect } from "react"
import type { Toast } from "react-hot-toast"
import CrossIcon from "../../fundamentals/icons/cross-icon"
import XCircleIcon from "../../fundamentals/icons/x-circle-icon"
import ToasterContainer from "../toaster-container"
import { useTranslation } from "react-i18next"

type SavingStateProps = {
  toast: Toast
  title?: string
  message?: string
  onDismiss: () => void
}

const ErrorState: React.FC<SavingStateProps> = ({
  toast,
  title,
  message,
  onDismiss,
}) => {
  const { t } = useTranslation()
  useEffect(() => {
    const life = setTimeout(() => {
      onDismiss()
    }, 2000)

    return () => {
      clearTimeout(life)
    }
  }, [toast])

  return (
    <ToasterContainer visible={toast.visible} className="w-[448px]">
      <div>
        <XCircleIcon size={20} className="text-rose-40" />
      </div>
      <div className="ml-small mr-base flex flex-grow flex-col gap-y-2xsmall">
        <span className="inter-small-semibold">
          {title ? title : t("Error")}
        </span>
        <span className="inter-small-regular text-grey-50">
          {message
            ? message
            : t(
                "An error occured while trying to save your changes. Please try again."
              )}
        </span>
      </div>
      <div>
        <button onClick={onDismiss}>
          <CrossIcon size={20} className="text-grey-40" />
        </button>
        <span className="sr-only">{t("Close")}</span>
      </div>
    </ToasterContainer>
  )
}

export default ErrorState
