import React from "react";
import i18n from "../../core/i18n";
import { useTranslation } from "react-i18next";
import { TieredMenu } from "primereact/tieredmenu";
import { withRouter } from "react-router";


function App({history}) {
  const { t } = useTranslation("namespace1");

  const items = [
    {
      label: t("users"),
      items: [
        {
          label: t("users"),
          command: () => history.push("/admin/users")
        },
        {
          label: t("admins"),
          command: () => history.push("/admin/admins")
        }
      ]
    },
    {
      label: t("settings"),
      items: [
        {
          label: t("languages"),
          command: () => history.push("/admin/languages")
        },
        {
          label: t("lexicons"),
          command: () => history.push("/admin/lexicons")

        },
        {
          label: t("awardTypes"),
          command: () => history.push("/admin/awardTypes")
        },
        {
          label: t("words"),
          command: () => history.push("/admin/words")
        },
        {
          label: t("config"),
          command: () => history.push("/admin/config")
        }
      ]
    },
    {
      label: t("organization"),
      items: [
        {
          label: t("organizers"),
          command: () => history.push("/admin/organizers")
        },
        {
          label: t("salones"),
          command: () => history.push("/admin/salones")

        },
        {
          label: t("contests"),
          command: () => history.push("/admin/contests")
        }
      ]
    }
  ];

  return (
    <div className="w-1/5 h-full">
      <TieredMenu className="h-full" model={items}/>
    </div>
  );
}

export default withRouter(App);
