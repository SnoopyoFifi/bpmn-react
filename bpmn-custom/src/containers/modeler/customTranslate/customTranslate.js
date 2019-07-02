import translations from './translationsGerman';

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  // 翻译
  template = translations[template] || template;

  // 替换
  return template.replace(/{([^}]+)}/g, (_, key) => {
    let str = replacements[key];
    if (translations[replacements[key]] != null && translations[replacements[key]] !== 'undefined') {
      str = translations[replacements[key]];
    }
    return str || `{${key}}`;
  });
}
