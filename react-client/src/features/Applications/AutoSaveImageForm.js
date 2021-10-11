import React, {useEffect, useState} from "react";
import { FormSpy } from "react-final-form";
import cn from "classnames";

const AutoSave = ({values, debounce, onSave}) => {
  const [tim, setTim] = useState();
  const [submitting, setSubmitting] = useState();

  const save = async () => {
    setSubmitting(true);
    await onSave(values);
    setSubmitting(false);
  };

  useEffect(() => {
    if (tim) {
      clearTimeout(tim);
    }
    setTim(setTimeout(save, debounce));
  }, [values, debounce]);

  const cls = cn("text-semi-bright",{
    invisible: !submitting
  });

  return (
    <div className={cls}>Сохранение...</div> || <div></div>
  );
};

const AutoSaveSpy = props => {
  return <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />;
};

export default AutoSaveSpy;
