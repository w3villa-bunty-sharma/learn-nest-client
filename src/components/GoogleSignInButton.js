"use client";

import { useEffect, useRef } from "react";

const GOOGLE_SCRIPT_ID = "learnnest-google-identity-sdk";

function loadGoogleIdentity() {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google.accounts.id);
  }

  if (window.__learnNestGoogleIdentityPromise) {
    return window.__learnNestGoogleIdentityPromise;
  }

  window.__learnNestGoogleIdentityPromise = new Promise((resolve, reject) => {
    let script = document.getElementById(GOOGLE_SCRIPT_ID);

    const handleLoad = () => {
      const googleIdentity = window.google?.accounts?.id;
      if (googleIdentity) resolve(googleIdentity);
      else reject(new Error("Google Identity SDK did not initialize."));
    };

    if (!script) {
      script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Google Identity SDK failed to load.")),
        { once: true },
      );
      document.head.appendChild(script);
      return;
    }

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Google Identity SDK failed to load.")),
      { once: true },
    );
  });

  return window.__learnNestGoogleIdentityPromise;
}

export default function GoogleSignInButton({ onSuccess, onError, text }) {
  const containerRef = useRef(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const renderedRef = useRef(false);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  useEffect(() => {
    let active = true;

    loadGoogleIdentity()
      .then((googleIdentity) => {
        const container = containerRef.current;
        if (!active || !container || renderedRef.current) return;

        container.replaceChildren();
        renderedRef.current = true;
        googleIdentity.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: (credentialResponse) => {
            if (!credentialResponse?.credential) {
              onErrorRef.current?.();
              return;
            }
            onSuccessRef.current?.(credentialResponse);
          },
        });
        googleIdentity.renderButton(container, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text,
          width: 320,
        });
      })
      .catch(() => {
        if (active) onErrorRef.current?.();
      });

    return () => {
      active = false;
    };
  }, [text]);

  return <div ref={containerRef} className="h-10 w-[320px]" />;
}
