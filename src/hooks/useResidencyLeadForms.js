import { useState, useCallback } from 'react';
import {
  applyFormErrors,
  buildLeadPayload,
  buildOfficePayload,
  clearFormErrors,
  submitContactLead,
  validateLeadForm,
  validateOfficeForm,
} from '../utils/residencyFormHelpers';

export function useResidencyLeadForms(service, options = {}) {
  const {
    leadType = 'Residency Consultation',
    officeType = 'Office Visit Request',
    requirePhone = true,
    requireInterest = false,
    leadOnly = false,
    leadSuccessMessage = 'Thank you — an advisor will be in touch shortly.',
    officeSuccessMessage = "Thank you — we'll be in touch shortly to confirm your visit.",
  } = options;

  const [leadLoading, setLeadLoading] = useState(false);
  const [leadMsg, setLeadMsg] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [officeLoading, setOfficeLoading] = useState(false);
  const [officeMsg, setOfficeMsg] = useState('');
  const [officeSuccess, setOfficeSuccess] = useState(false);
  const [officeSubmitted, setOfficeSubmitted] = useState(false);

  const handleLeadSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (leadLoading) return;

    const form = e.target;
    clearFormErrors(form);
    setLeadMsg('');

    const { errors, data } = validateLeadForm(form, { requirePhone, requireInterest });
    if (Object.keys(errors).length > 0) {
      applyFormErrors(form, errors);
      setLeadSuccess(false);
      return;
    }

    try {
      setLeadLoading(true);
      const payload = buildLeadPayload(service, data, leadType);
      await submitContactLead(payload);
      setLeadSuccess(true);
      setLeadSubmitted(true);
      setLeadMsg(leadSuccessMessage);
      form.reset();
      clearFormErrors(form);
    } catch (err) {
      setLeadSuccess(false);
      setLeadMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLeadLoading(false);
    }
  }, [leadLoading, leadSuccessMessage, leadType, requireInterest, requirePhone, service]);

  const handleOfficeSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (officeLoading || leadOnly) return;

    const form = e.target;
    clearFormErrors(form);
    setOfficeMsg('');

    const { errors, data } = validateOfficeForm(form);
    if (Object.keys(errors).length > 0) {
      applyFormErrors(form, errors);
      setOfficeSuccess(false);
      return;
    }

    try {
      setOfficeLoading(true);
      const payload = buildOfficePayload(service, data, officeType);
      await submitContactLead(payload);
      setOfficeSuccess(true);
      setOfficeSubmitted(true);
      setOfficeMsg(officeSuccessMessage);
      form.reset();
      clearFormErrors(form);
    } catch (err) {
      setOfficeSuccess(false);
      setOfficeMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setOfficeLoading(false);
    }
  }, [leadOnly, officeLoading, officeSuccessMessage, officeType, service]);

  return {
    handleLeadSubmit,
    handleOfficeSubmit,
    leadLoading,
    officeLoading,
    leadSubmitted,
    officeSubmitted,
    leadMsg,
    officeMsg,
    leadSuccess,
    officeSuccess,
  };
}

export default useResidencyLeadForms;
