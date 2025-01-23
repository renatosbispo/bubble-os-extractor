async function getOptionSets() {
  const optionSets = [];
  const optionSetElements = getOptionSetElements();

  // Every time an option set element is clicked, the elements are recreated, so
  // all the elements must be retrieved again after the data from each one is
  // extracted.
  for (let i = 0; i < optionSetElements.length; i++) {
    const optionSetElement = getOptionSetElements()[i];

    const name = getOptionSetName(optionSetElement);
    const fields = await getOptionSetFields(optionSetElement);
    const options = await getOptionSetOptions(optionSetElement);

    optionSets.push({ name, fields });
  }

  return optionSets;
}

function getOptionSetElements() {
  const optionSetsSelector = '.option.sets .custom-types .custom-type-entry';
  const optionSetElements = document.querySelectorAll(optionSetsSelector);

  return optionSetElements;
}

async function getOptionSetFields(optionSetElement) {
  optionSetElement.click();

  await delay(200);

  const builtIn = getOptionSetFieldsBuiltIn();
  const custom = getOptionSetFieldsCustom();

  return { custom, builtIn };
}

function getOptionSetFieldsBuiltIn() {
  const builtInFieldsSelector =
    '.custom-fields.option-set-attributes .field.built-in';
  const builtInFields = document.querySelectorAll(builtInFieldsSelector);

  const builtInFieldNameSelector = '.built-in-field-name';
  const builtInFieldTypeSelector = '.field-type';
  const fields = Array.from(builtInFields).map((builtInField) => {
    const builtInFieldName = builtInField.querySelector(builtInFieldNameSelector);
    const builtInFieldType = builtInField.querySelector(builtInFieldTypeSelector);

    return { name: builtInFieldName.innerText, type: builtInFieldType.innerText };
  });

  return fields;
}

function getOptionSetFieldsCustom() {
  const customFieldsSelector =
    '.custom-fields.option-set-attributes .field:not(.built-in)';
  const customFields = document.querySelectorAll(customFieldsSelector);

  const customFieldNameSelector = 'input[type="text"]';
  const customFieldTypeSelector = '.field-type';
  const fields = Array.from(customFields).map((customField) => {
    const customFieldName = customField.querySelector(customFieldNameSelector);
    const customFieldType = customField.querySelector(customFieldTypeSelector);

    return { name: customFieldName.value, type: customFieldType.innerText };
  });

  return fields;
}

function getOptionSetName(optionSetElement) {
  const nameSelector = '.display';

  return optionSetElement.querySelector(nameSelector).innerText;
}

async function getOptionSetOptions(optionSetElement) {
  optionSetElement.click();

  await delay(200);

  const optionsSelector = '.custom-fields.option-set-values .field';
  const optionElements = document.querySelectorAll(optionsSelector);

  const optionNameFieldSelector = 'input[type="text"]';
  const options = Array.from(optionElements).map((optionElement) => {
    const optionNameField = optionElement.querySelector(
      optionNameFieldSelector
    );

    return optionNameField.value;
  });

  return options;
}

async function delay(duration) {
  return new Promise((resolve) => setTimeout(() => resolve(), duration));
}

async function displayOptionSets() {
  const optionSets = await getOptionSets();

  console.log("[bubble-os-extractor] Output:", optionSets);
}

displayOptionSets();
