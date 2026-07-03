import API_BASE from '../config.js';

export const validateName = (v) => /^[A-Za-z\s]{2,}$/.test(String(v || '').trim());
export const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(String(v || '').trim());
export const validatePhone = (v) => /^[0-9]{10,15}$/.test(String(v || ''));
export const todayStr = () => new Date().toISOString().split('T')[0];
export const isPastDate = (value) => value && value < todayStr();

const LEAD_KEYS = {
  fname: ['fname', 'l-fname', 'firstName', 'fn'],
  lname: ['lname', 'l-lname', 'lastName', 'ln'],
  email: ['email', 'l-email', 'em'],
  phone: ['phone', 'l-phone', 'ph'],
  country: ['country', 'l-country', 'nationality', 'na'],
  interest: ['interest', 'route', 'l-interest', 'work', 'l-program', 'profession', 'pr'],
  message: ['message', 'ms'],
  income: ['income'],
  family: ['family'],
};

const OFFICE_KEYS = {
  name: ['ov-name', 'name'],
  phone: ['ov-phone', 'phone'],
  email: ['ov-email', 'email'],
  date: ['ov-date', 'date'],
  time: ['ov-time', 'time'],
  program: ['ov-program', 'program'],
};

export function resolveFieldId(form, keys) {
  if (!form) return keys[0];
  for (const key of keys) {
    if (form.querySelector(`#${CSS.escape(key)}`) || form.elements?.[key]) return key;
  }
  return keys[0];
}

export function getField(form, keys) {
  if (!form) return '';
  const list = Array.isArray(keys) ? keys : [keys];
  for (const key of list) {
    const el = form.querySelector(`#${CSS.escape(key)}`) || form.elements?.[key];
    if (el && 'value' in el) {
      const val = typeof el.value === 'string' ? el.value.trim() : String(el.value ?? '').trim();
      if (val) return val;
    }
  }
  return '';
}

export function parseLeadForm(form) {
  const fname = getField(form, LEAD_KEYS.fname);
  const lname = getField(form, LEAD_KEYS.lname);
  const email = getField(form, LEAD_KEYS.email);
  const phone = getField(form, LEAD_KEYS.phone);
  const country = getField(form, LEAD_KEYS.country);
  const interest = getField(form, LEAD_KEYS.interest);
  const message = getField(form, LEAD_KEYS.message) || form.querySelector('textarea')?.value?.trim() || '';
  const income = getField(form, LEAD_KEYS.income);
  const family = getField(form, LEAD_KEYS.family);
  const fullName = `${fname} ${lname}`.trim() || getField(form, ['name', 'ov-name']);
  return { fname, lname, email, phone, country, interest, message, income, family, name: fullName };
}

export function parseOfficeForm(form) {
  return {
    name: getField(form, OFFICE_KEYS.name),
    phone: getField(form, OFFICE_KEYS.phone),
    email: getField(form, OFFICE_KEYS.email),
    date: getField(form, OFFICE_KEYS.date),
    time: getField(form, OFFICE_KEYS.time),
    program: getField(form, OFFICE_KEYS.program),
  };
}

export function clearFormErrors(form) {
  if (!form) return;
  form.querySelectorAll('.field-err-dynamic').forEach((el) => el.remove());
  form.querySelectorAll('.field-error-input').forEach((el) => {
    el.classList.remove('field-error-input');
    el.style.borderColor = '';
    el.style.boxShadow = '';
  });
}

export function applyFormErrors(form, errors) {
  clearFormErrors(form);
  Object.entries(errors).forEach(([fieldId, msg]) => {
    const el = form.querySelector(`#${CSS.escape(fieldId)}`) || form.elements?.[fieldId];
    if (!el) return;
    el.classList.add('field-error-input');
    el.style.borderColor = '#ef4444';
    el.style.boxShadow = '0 0 0 3px rgba(239,68,68,.12)';
    const wrap = el.closest('.field');
    if (wrap && !wrap.querySelector('.field-err-dynamic')) {
      const p = document.createElement('p');
      p.className = 'field-err field-err-dynamic';
      p.style.cssText = 'color:#ef4444;font-size:12px;margin-top:4px;';
      p.textContent = msg;
      wrap.appendChild(p);
    }
  });
  const firstId = Object.keys(errors)[0];
  const firstEl = firstId && (form.querySelector(`#${CSS.escape(firstId)}`) || form.elements?.[firstId]);
  firstEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function validateLeadForm(form, { requirePhone = true, requireInterest = false } = {}) {
  const data = parseLeadForm(form);
  const errors = {};
  const fnameId = resolveFieldId(form, LEAD_KEYS.fname);
  const lnameId = resolveFieldId(form, LEAD_KEYS.lname);
  const emailId = resolveFieldId(form, LEAD_KEYS.email);
  const phoneId = resolveFieldId(form, LEAD_KEYS.phone);
  const interestId = resolveFieldId(form, LEAD_KEYS.interest);

  if (!data.fname) errors[fnameId] = 'First name is required';
  else if (!validateName(data.fname)) errors[fnameId] = 'Only alphabets (min 2 chars)';

  if (!data.lname) errors[lnameId] = 'Last name is required';
  else if (!validateName(data.lname)) errors[lnameId] = 'Only alphabets (min 2 chars)';

  if (!data.email) errors[emailId] = 'Email is required';
  else if (!validateEmail(data.email)) errors[emailId] = 'Invalid email';

  if (requirePhone) {
    if (!data.phone) errors[phoneId] = 'Phone is required';
    else if (!validatePhone(data.phone.replace(/\D/g, ''))) errors[phoneId] = 'Enter valid 10-15 digit number';
  } else if (data.phone && !validatePhone(data.phone.replace(/\D/g, ''))) {
    errors[phoneId] = 'Enter valid 10-15 digit number';
  }

  if (requireInterest && !data.interest) errors[interestId] = 'Please select an option';

  return { errors, data };
}

export function validateOfficeForm(form) {
  const data = parseOfficeForm(form);
  const errors = {};
  const nameId = resolveFieldId(form, OFFICE_KEYS.name);
  const phoneId = resolveFieldId(form, OFFICE_KEYS.phone);
  const emailId = resolveFieldId(form, OFFICE_KEYS.email);
  const dateId = resolveFieldId(form, OFFICE_KEYS.date);
  const timeId = resolveFieldId(form, OFFICE_KEYS.time);

  if (!data.name) errors[nameId] = 'Full name is required';
  else if (!validateName(data.name)) errors[nameId] = 'Only alphabets (min 2 chars)';

  if (!data.phone) errors[phoneId] = 'Phone is required';
  else if (!validatePhone(data.phone.replace(/\D/g, ''))) errors[phoneId] = 'Enter valid 10-15 digit number';

  if (!data.email) errors[emailId] = 'Email is required';
  else if (!validateEmail(data.email)) errors[emailId] = 'Invalid email';

  if (!data.date) errors[dateId] = 'Please select a preferred date';
  else if (isPastDate(data.date)) errors[dateId] = 'Please choose a future date';

  if (!data.time) errors[timeId] = 'Please select a preferred time';

  return { errors, data };
}

export async function submitContactLead(payload) {
  const response = await fetch(`${API_BASE}/api/contact-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Submission failed. Please try again.');
  return data;
}

export function buildLeadPayload(service, data, leadType, extra = []) {
  const phone = data.phone.replace(/\D/g, '');
  const parts = [
    `${service} consultation request.`,
    data.country ? `Country/Nationality: ${data.country}.` : '',
    data.interest ? `Interest: ${data.interest}.` : '',
    data.income ? `Income range: ${data.income}.` : '',
    data.family ? `Family situation: ${data.family}.` : '',
    data.message ? `Message: ${data.message}.` : '',
    ...extra,
  ].filter(Boolean);

  return {
    name: data.name,
    email: data.email,
    mobile: phone || '0000000000',
    message: parts.join(' '),
    type: leadType,
    service,
  };
}

export function buildOfficePayload(service, data, officeType) {
  const phone = data.phone.replace(/\D/g, '');
  return {
    name: data.name,
    email: data.email,
    mobile: phone,
    message: `Office visit request on ${data.date} (${data.time}).${data.program ? ` Programme: ${data.program}.` : ''} Service: ${service}.`,
    type: officeType,
    service,
  };
}
