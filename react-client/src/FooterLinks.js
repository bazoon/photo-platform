import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function FooterLinks(){
  const { t } = useTranslation("namespace1");
  return(
    <div className="grid gap-2 grid-cols-2 grid-rows-3">
      <Link className="text-gray2 no-underline hover:underline" to="/thesis">{t("about-us")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="/partners">{t("partners")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="/organizers">{t("organizers")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="/jury">{t("jury")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="/rules">{t("rules")}</Link>
      <Link className="text-gray2 no-underline hover:underline" to="/politics">{t("politics")}</Link>
    </div>
  );
}

export default FooterLinks;
