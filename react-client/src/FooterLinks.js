import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function FooterLinks(){
  const { t } = useTranslation("namespace1");
  return(
    <div className="grid gap-2 text-lg grid-cols-2 grid-rows-3">
      <Link className="text-gray2 no-underline hover:underline" to="">{t("about-us")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="">{t("partners")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="">{t("organizers")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="">{t("jury")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="">{t("rules")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="">{t("politics")}</Link>
    </div>
  );
}

export default FooterLinks;
