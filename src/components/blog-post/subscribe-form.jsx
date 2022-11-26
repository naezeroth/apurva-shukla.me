import React from 'react';
import { rhythm } from '../../utils/typography';
import Button from '../shared/button';

export function SubscribeForm() {
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
                method="post"
                action="https://listmonk.apurva-shukla.me/subscription/form"
                id="newsletter"
        >
          <div>
            <h3>Subscribe to my newsletter</h3>
            <p>
              I'll occasionally send you my writing, and things I've
              found interesting
            </p>
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
                            }}
              />
            </p>
            <input
                        id="9ed94"
                        type="hidden"
                        name="l"
                        checked
                        value="9ed94b7c-8e2f-4e62-be2c-3dc2e3c5f5e3"
                        readOnly
            />
            <Button marginRight="25px">Subscribe</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
