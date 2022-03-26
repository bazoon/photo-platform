import React, {useEffect} from "react";
import i18n from "../../core/i18n";
import { useTranslation } from "react-i18next";
import { TieredMenu } from "primereact/tieredmenu";
import { withRouter } from "react-router";
import {collect} from "react-recollect";
import useAuth from "../../core/hooks/useAuth";


function AdminMenu({history, store}) {
  window.store=store;
  const { t } = useTranslation("namespace1");
  const { canNot } = useAuth(store.permissions);


  const items = [
    {
      label: t("users"),
      items: [
        {
          label: t("users"),
          command: () => history.push("/admin/users"),
          disabled: canNot(["users.view"])
        },
        {
          label: t("admins"),
          command: () => history.push("/admin/admins"),
          disabled: canNot(["admins.view", "moders.view"])
        },
        // {
        //   label: t("moders"),
        //   command: () => history.push("/admin/moders"),
        //   disabled: canNot(["moders.view"])
        // }
      ]
    },
    {
      label: t("settings"),
      items: [
        {
          label: t("settings"),
          command: () => history.push("/admin/settings"),
          disabled: canNot(["settings.view"])
        },
        {
          label: t("files"),
          command: () => history.push("/admin/files"),
          disabled: canNot(["files.view"])
        },
        {
          label: t("saloneSettings"),
          command: () => history.push("/admin/saloneSettings"),
          disabled: canNot(["saloneSettings.view"])
        },
        {
          label: t("languages"),
          command: () => history.push("/admin/languages"),
          disabled: canNot(["languages.view"])
        },
        {
          label: t("lexicons"),
          command: () => history.push("/admin/lexicons"),
          disabled: canNot(["lexicons.view"])

        },
        {
          label: t("awardTypes"),
          command: () => history.push("/admin/awardTypes"),
          disabled: canNot(["awardTypes.view"])
        },
        {
          label: t("words"),
          command: () => history.push("/admin/words"),
          disabled: canNot(["words.view"])
        },
        // {
        //   label: t("config"),
        //   command: () => history.push("/admin/config")
        // }
      ]
    },
    {
      label: t("organization"),
      items: [
        {
          label: t("organizers"),
          command: () => history.push("/admin/organizers"),
          disabled: canNot(["organizers.view"])
        },
        {
          label: t("salones"),
          command: () => history.push("/admin/salones"),
          disabled: canNot(["salones.view"])

        },
        {
          label: t("contests"),
          command: () => history.push("/admin/contests"),
          disabled: canNot(["contests.view", "contests.view.domain"])
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

export default withRouter(collect(AdminMenu));
