import clsx from "clsx"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ArrowLeftIcon from "../../fundamentals/icons/arrow-left-icon"

type Props = {
  path?: string
  label?: string
  className?: string
}

const BackButton = ({ path, label, className }: Props) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  return (
    <button
      onClick={() => {
        path ? navigate(path) : navigate(-1)
      }}
      className={clsx("px-small py-xsmall", className)}
    >
      <div className="inter-grey-40 inter-small-semibold flex items-center gap-x-xsmall text-grey-50">
        <ArrowLeftIcon size={20} />
        <span className="ml-1">{label ? label : t("Go back")}</span>
      </div>
    </button>
  )
}

export default BackButton
