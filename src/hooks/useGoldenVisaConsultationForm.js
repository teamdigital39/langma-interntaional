import { useState, useCallback } from 'react';
import {
  applyFormErrors,
  clearFormErrors,
  getField,
  submitContactLead,
  validateEmail,
  validateName,
  validatePhone,
} from '../utils/residencyFormHelpers';

function parseConsultationForm(form) {
  const fname = getField(form, ['fFirst', 'firstName']);
  const lname = getField(form, ['fLast', 'lastName']);
  const name = getField(form, ['fName', 'name']) || `${fname} ${lname}`.trim();
  const email = getField(form, ['fEmail', 'email']);
  const phone = getField(form, ['fPhone', 'phone']);
  const country = getField(form, ['fCountry', 'country']);
  const interest = getField(form, [
    'fInterest',
    'fRoute',
    'fBudget',
    'fInvestment',
    'interest',
    'route',
    'budget',
    'investment',
  ]);
  const message = getField(form, ['fMsg', 'message']);
  return { name, email, phone, country, interest, message };
}

function validateConsultationForm(form, { requirePhone }) {
  const data = parseConsultationForm(form);
  const errors = {};
  const usesSplitName = Boolean(form.querySelector('#fFirst'));

  if (usesSplitName) {
    const fname = getField(form, ['fFirst']);
    const lname = getField(form, ['fLast']);
    if (!fname) errors.fFirst = 'First name is required';
    else if (!validateName(fname)) errors.fFirst = 'Only alphabets (min 2 chars)';
    if (!lname) errors.fLast = 'Last name is required';
    else if (!validateName(lname)) errors.fLast = 'Only alphabets (min 2 chars)';
  } else {
    if (!data.name) errors.fName = 'Full name is required';
    else if (!validateName(data.name)) errors.fName = 'Only alphabets (min 2 chars)';
  }

  if (!data.email) errors.fEmail = 'Email is required';
  else if (!validateEmail(data.email)) errors.fEmail = 'Invalid email';

  const phoneDigits = data.phone.replace(/\D/g, '');
  if (requirePhone) {
    if (!phoneDigits) errors.fPhone = 'Phone is required';
    else if (!validatePhone(phoneDigits)) errors.fPhone = 'Enter valid 10-15 digit number';
  } else if (phoneDigits && !validatePhone(phoneDigits)) {
    errors.fPhone = 'Enter valid 10-15 digit number';
  }

  return { errors, data };
}

function buildSuccessMessage(service, selectedDate, selectedTime) {
  const confirmed = selectedDate && selectedTime;
  if (!confirmed) {
    return 'Your enquiry has been received. A senior advisor will be in touch shortly to confirm your consultation.';
  }
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const bookingStr = `${selectedDate.toLocaleDateString('en-GB', opts)} at ${selectedTime} IST`;
  return `Your enquiry has been received for ${bookingStr}. A senior advisor will confirm by email shortly.`;
}

export function useGoldenVisaConsultationForm(service, options = {}) {
  const {
    leadType = 'Golden Visa Consultation',
    requirePhone = false,
  } = options;

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [doneText, setDoneText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(async (e, { selectedDate, selectedTime } = {}) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    clearFormErrors(form);
    setErrorMsg('');

    const consent = form.querySelector('#fConsent');
    if (consent && !consent.checked) {
      consent.reportValidity?.();
      return;
    }

    const { errors, data } = validateConsultationForm(form, { requirePhone });
    if (Object.keys(errors).length > 0) {
      applyFormErrors(form, errors);
      return;
    }

    const confirmed = selectedDate && selectedTime;
    const bookingExtra = [];
    if (confirmed) {
      const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const bookingStr = `${selectedDate.toLocaleDateString('en-GB', opts)} at ${selectedTime} IST`;
      bookingExtra.push(`Preferred consultation: ${bookingStr}.`);
    }

    const phone = data.phone.replace(/\D/g, '');
    const payload = {
      name: data.name,
      email: data.email,
      mobile: phone || '0000000000',
      message: [
        `${service} consultation request.`,
        data.country ? `Country/Nationality: ${data.country}.` : '',
        data.interest ? `Interest: ${data.interest}.` : '',
        data.message ? `Message: ${data.message}.` : '',
        ...bookingExtra,
      ].filter(Boolean).join(' '),
      type: leadType,
      service,
    };

    try {
      setLoading(true);
      await submitContactLead(payload);
      setDoneText(buildSuccessMessage(service, selectedDate, selectedTime));
      setSubmitted(true);
      form.reset();
      clearFormErrors(form);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading, leadType, requirePhone, service]);

  return { handleSubmit, loading, submitted, doneText, errorMsg };
}

export default useGoldenVisaConsultationForm;
