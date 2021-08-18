import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
import isArray from "lodash/isArray";
import objectToFormData from "object-to-formdata";
import PropTypes from "prop-types";

import Actions from "../actions";
import { withTranslation } from "react-i18next";

const Form = ({
  children,
  handleSubmit,
  submitForm,
  values,
  isSubmitting,
  setFieldValue,
  setFieldError,
  setFieldTouched
}) => (
  <form onSubmit={handleSubmit}>
    {children({ handleSubmit, submitForm, values, isSubmitting, setFieldValue, setFieldError, setFieldTouched })}
  </form>
);

Form.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  entity: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  method: PropTypes.oneOf(["get", "post", "put", "delete"]).isRequired,
  primaryKey: PropTypes.string,
  fields: PropTypes.array.isRequired,
  appendData: PropTypes.bool,
  prependData: PropTypes.bool,
  updateData: PropTypes.bool,
  deleteData: PropTypes.bool,
  normalizeData: PropTypes.bool,
  sendAsFormData: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

Form.defaultProps = {
  primaryKey: "id",
  appendData: false,
  prependData: false,
  updateData: false,
  deleteData: false,
  normalizeData: true,
  sendAsFormData: true,
  onSuccess: () => {},
  onError: () => {}
};

const EnhacedForm = withFormik({
  enableReinitialize: true,
  validationSchema: ({ fields, t }) => {
    if (!isArray(fields)) {
      return Yup.object().shape({});
    }

    let validationFields = {};

    fields.forEach(field => {
      let validationField;

      switch (field.type) {
        case "string":
          validationField = Yup.string().typeError("Must be a string");
          break;
        case "object":
          validationField = Yup.object();
          break;
        case "number":
          validationField = Yup.number().typeError("Must be a number");
          break;
        case "array":
          validationField = Yup.array();
          break;
        case "boolean":
          validationField = Yup.boolean();
          break;
        case "date":
          validationField = Yup.date();
          break;
        default:
          validationField = Yup.string();
      }

      if (field.required) {
        validationField = validationField.required(t("Required"));
      }

      if (field.min) {
        validationField = validationField.min(field.min, t("Too Short!"));
      }

      if (field.max) {
        validationField = validationField.max(field.max, t("Too Long!"));
      }

      validationField = validationField.nullable();

      validationFields[field.name] = validationField;
    });

    return Yup.object().shape(validationFields);
  },
  mapPropsToValues: ({ fields }) => {
    return isArray(fields)
      ? fields.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.name]: get(curr, "value", "")
          }),
          {}
        )
      : {};
  },
  handleSubmit: (values, { props, setFieldError, setSubmitting, resetForm }) => {
    let {
      id,
      entity,
      timeOut,
      name,
      url,
      params,
      method,
      primaryKey,
      fields,
      appendData,
      prependData,
      updateData,
      deleteData,
      normalizeData,
      sendAsFormData,
      onSuccess,
      onError,
      FormAction
    } = props;

    values = { ...values };

    if (typeof url === "function") {
      url = url({ ...values });
    }

    fields.forEach(field => {
      if (field.hasOwnProperty("onSubmitValue")) {
        if (typeof field.onSubmitValue === "function") {
          if (field.hasOwnProperty("onSubmitKey")) {
            values[field.onSubmitKey] = field.onSubmitValue(values[field.name], values);
            delete values[field.name];
          } else {
            values[field.name] = field.onSubmitValue(values[field.name], values);
          }
        }
      }
      if (field.hasOwnProperty("disabled")) {
        delete values[field.name];
      }
    });
    if (sendAsFormData) {
      values = objectToFormData(values);
      // values.append('_method', 'PUT');
    }

    FormAction({
      id,
      entity,
      timeOut,
      name,
      url,
      params,
      method,
      primaryKey,
      values,
      appendData,
      prependData,
      updateData,
      deleteData,
      normalizeData,
      cb: {
        success: data => {
          onSuccess(data, resetForm);
        },
        error: error => {
          if (error.message !== "Network Error") {
            Object.keys(error).forEach(item => {
              setFieldError(item, error[item][0]);
            });
          }
          onError(error, resetForm);
        },
        finally: () => {
          setSubmitting(false);
        }
      }
    });
  }
})(Form);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      FormAction: Actions.Form.request
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(withTranslation("")(EnhacedForm));
