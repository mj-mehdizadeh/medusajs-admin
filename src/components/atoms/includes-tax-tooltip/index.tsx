import clsx from "clsx"
import React from "react"
import TaxesIcon from "../../fundamentals/icons/taxes-icon"
import Tooltip from "../tooltip"
import { useTranslation } from "react-i18next"

type Props = {
  includesTax?: boolean
}

const IncludesTaxTooltip = ({ includesTax }: Props) => {
  const { t } = useTranslation()
  return (
    <Tooltip
      content={includesTax ? t("Tax incl. price") : t("Tax excl. price")}
    >
      <div className="flex h-large w-large items-center justify-center rounded-rounded border border-grey-20">
        <TaxesIcon
          size={16}
          className={clsx({
            "text-grey-50": includesTax,
            "text-grey-30": !includesTax,
          })}
        />
      </div>
    </Tooltip>
  )
}

export default IncludesTaxTooltip
