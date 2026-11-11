import fs from "node:fs/promises";

const catalogUrl = new URL("./field-catalog.json", import.meta.url);
let catalogPromise;

export async function loadCatalog() {
  catalogPromise ||= fs.readFile(catalogUrl, "utf8").then(JSON.parse);
  return catalogPromise;
}

export async function getAlertRuleFields({ alertObjectType, statisticalObjectType, query = "" }) {
  const catalog = await loadCatalog();
  const alertObject = catalog.alertObjects.find((item) => item.code === alertObjectType);
  if (!alertObject) {
    const error = new Error("UNSUPPORTED_ALERT_OBJECT_TYPE");
    error.statusCode = 400;
    throw error;
  }

  const allowedTypes = alertObject.allowedStatisticalObjectTypes;
  if (statisticalObjectType && !allowedTypes.includes(statisticalObjectType)) {
    const error = new Error("STATISTICAL_OBJECT_NOT_ALLOWED");
    error.statusCode = 400;
    throw error;
  }

  const selectedTypes = statisticalObjectType ? [statisticalObjectType] : allowedTypes;
  const normalizedQuery = query.trim().toLowerCase();
  const statisticalObjects = selectedTypes.map((code) => {
    const object = catalog.statisticalObjects[code];
    const fields = object.fields.filter((field) => {
      if (!normalizedQuery) return true;
      return `${field.id} ${field.name} ${field.group} ${field.businessType}`.toLowerCase().includes(normalizedQuery);
    });
    return { ...object, fields };
  });

  return {
    schemaVersion: catalog.schemaVersion,
    source: catalog.source,
    alertObject,
    statisticalObjects,
  };
}

export async function getComparableFields({ alertObjectType, fieldId }) {
  const response = await getAlertRuleFields({ alertObjectType });
  const allFields = response.statisticalObjects.flatMap((object) =>
    object.fields.map((field) => ({ ...field, statisticalObjectType: object.code, statisticalObjectLabel: object.label })),
  );
  const sourceField = allFields.find((field) => field.id === fieldId);
  if (!sourceField) {
    const error = new Error("FIELD_NOT_AVAILABLE");
    error.statusCode = 404;
    throw error;
  }
  const allowedIds = new Set(sourceField.comparableMetricIds);
  return {
    sourceField,
    fields: allFields.filter((field) => allowedIds.has(field.id)),
  };
}
