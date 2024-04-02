// just-validate

const validate = new window.JustValidate(document.querySelector('.about-form'));
const validateContacts = new window.JustValidate(document.querySelector('.contacts-form'))

validate.addField(document.querySelector('.about-form__input'), [
  {
    rule: 'email',
    errorMessage: 'Недопустимый формат',
  },
])

validateContacts
  .addField(document.querySelector('.contacts-form__email'), [
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    }
  ])
  .addField(document.querySelector('.contacts-form__name'), [
    {
      rule: 'customRegexp',
      value: /[a-z]|[а-я]/gi,
      errorMessage: 'Недопустимый формат',
    }
  ])
