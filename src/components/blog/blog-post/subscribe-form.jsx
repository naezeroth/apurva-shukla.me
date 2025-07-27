import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { rhythm } from '../../../utils/typography';
import Button from '../../shared/button';

const SITE_KEY = 'a21084c2-f56a-4330-87fc-a72862a80772';

export function SubscribeForm() {
  const formRef = useRef(null);
  const captchaRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  // Called after hCaptcha issues a valid token
  const handleVerify = () => {
    formRef.current.submit(); // send the form (token is already injected)
  };

  // Intercept browser submit → run validation → trigger invisible captcha
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current.checkValidity()) {
      setSubmitting(true); // disable button while captcha runs
      captchaRef.current.execute(); // start invisible challenge
    } else {
      formRef.current.reportValidity();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: rhythm(1),
      }}
    >
      <div
        style={{
          boxShadow: 'var(--formShadow)',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: 'var(--subscribeBackground)',
        }}
      >
        <form
          ref={formRef}
          id="newsletter"
          method="post"
          action="https://listmonk.apurva-shukla.me/subscription/form"
          onSubmit={handleSubmit}
        >
          <h3>Subscribe to my newsletter</h3>
          <p>I’ll occasionally send you my writing and interesting links.</p>

          <p>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              style={{
                padding: '8px',
                borderColor: 'rgb(227, 227, 227)',
                borderRadius: '4px',
                width: '100%',
              }}
            />
          </p>

          <p>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              style={{
                padding: '8px',
                borderColor: 'rgb(227, 227, 227)',
                borderRadius: '4px',
                width: '100%',
              }}
            />
          </p>

          {/* list UUID that Listmonk expects */}
          <input
            type="hidden"
            name="l"
            value="9ed94b7c-8e2f-4e62-be2c-3dc2e3c5f5e3"
            readOnly
          />

          {/* Invisible hCaptcha widget */}
          <HCaptcha
            ref={captchaRef}
            sitekey={SITE_KEY}
            size="invisible"
            onVerify={handleVerify}
          />

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </div>
  );
}
